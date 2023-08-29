'use client'
import AddNewGroup from '@/components/AddNewGroup'
import AddNewModal from '@/components/AddNewModal'
import CustomerTabs from '@/components/CustomerTabs'
import { Button, Space, message } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { axiosConfig } from '@/api/apiConfig'

export interface IGroup {
	key: string
	label: string
	data: {
		id: string
		name: string
		numberPhone: string
		note?: string
		labels?: string[]
		status?: string
	}[]
}

const Customers = () => {
	const [showAddNewModal, setShowAddNewModal] = useState(false)
	const [activeTab, setActiveTab] = useState('')
	const [showAddNewGroup, setShowAddNewGroup] = useState(false)
	const [groups, setGroups] = useState<IGroup[]>([])

	const handleImportFromExcel = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			const reader = new FileReader()

			reader.onload = (event) => {
				const binaryString = event.target?.result
				if (binaryString) {
					const workbook = XLSX.read(binaryString, { type: 'binary' })
					const sheetName = workbook.SheetNames[0]
					const worksheet = workbook.Sheets[sheetName]

					const rawData = XLSX.utils.sheet_to_json<{
						name: string
						numberPhone: number
						__rowNum__: number
					}>(worksheet)

					const transformedData = rawData.map((row, index) => ({
						id: String(index + 1),
						name: row.name,
						numberPhone: String(row.numberPhone),
					}))

					const importData = async () => {
						try {
							for (
								let index = 0;
								index < transformedData.length;
								index++
							) {
								const element = transformedData[index]

								try {
									await axiosConfig.post('/customer/add', {
										name: element.name,
										phone: element.numberPhone,
										groupId: activeTab,
									})
								} catch (error) {
									console.log(`Error at row ${index + 1}`)
								}
							}

							message.success('Import data success!')
						} catch (error) {
							console.log(error)
						}
					}

					importData()
				}
			}

			reader.onerror = () => {
				console.error('Something went wrong while reading the file.')
			}

			reader.readAsBinaryString(file)
		}
	}

	const handleAddNewGroup = () => {
		setShowAddNewGroup(true)
	}

	useEffect(() => {
		// call api to get data groups
		const fetchDataGroups = async () => {
			try {
				const res = await axiosConfig.get('/customer-group/all')

				const dataGroups = res.data.customerGroups.map(
					(group: any) => ({
						key: group._id,
						label: group.name,
						data: group.customers,
					})
				)

				setGroups(dataGroups)
			} catch (error) {
				console.log(error)
			}
		}

		fetchDataGroups()
	}, [])

	useEffect(() => {
		if (groups.length > 0) {
			setActiveTab(groups[0].key)
		}
	}, [groups])

	const addNewGroup = (newGroup: IGroup) => {
		setGroups([...groups, newGroup])
	}

	return (
		<>
			<Space>
				<Button type='primary' onClick={handleAddNewGroup}>
					Add new group
				</Button>
				{/* button import from excel */}
				<input
					id='file-input'
					type='file'
					accept='.xlsx, .xls'
					style={{ display: 'none' }}
					onChange={handleImportFromExcel}
				/>
				<Button
					type='primary'
					onClick={() => {
						// @ts-ignore
						document.getElementById('file-input').click()
					}}
				>
					Import from excel
				</Button>
				<Button type='primary' onClick={() => setShowAddNewModal(true)}>
					Add new customer
				</Button>
			</Space>
			{/* name table */}

			<div
				style={{
					marginTop: '1rem',
				}}
			>
				<CustomerTabs
					groups={groups}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
			{/* add new customer */}
			<AddNewModal
				showAddNewModal={showAddNewModal}
				setShowAddNewModal={setShowAddNewModal}
				activeTabId={activeTab}
			/>
			<AddNewGroup
				showAddNewGroup={showAddNewGroup}
				setShowAddNewGroup={setShowAddNewGroup}
				addNewGroup={addNewGroup}
			/>
		</>
	)
}

export default Customers
