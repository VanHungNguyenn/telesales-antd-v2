'use client'
import { axiosConfig } from '@/api/apiConfig'
import { Space, Button, Form, Select, Table, message, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Campaigns = () => {
	const [form] = Form.useForm()
	const [listCampaigns, setListCampaigns] = useState<any[]>([])
	const [listScripts, setListScripts] = useState<any[]>([])
	const [listGroupCustomers, setListGroupCustomers] = useState<any[]>([])
	const router = useRouter()

	const fetchListCampaigns = async () => {
		try {
			const res = await axiosConfig.get('/campaign/all')

			const dataCampaigns = res.data.campaigns.map((campaign: any) => ({
				id: campaign._id,
				groupCustomer: campaign.customerGroupId.name,
				script: campaign.scriptId.name,
				status: campaign.status,
				name: campaign.name,
			}))

			setListCampaigns(dataCampaigns)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchListCampaigns()
	}, [])

	useEffect(() => {
		// fetch list group customers
		const fetchListGroupCustomers = async () => {
			try {
				const res = await axiosConfig.get('/customer-group/all')

				const dataGroups = res.data?.customerGroups.map(
					(group: any) => ({
						key: group._id,
						name: group.name,
					})
				)

				setListGroupCustomers(dataGroups)
			} catch (error) {
				console.log(error)
			}
		}

		fetchListGroupCustomers()
	}, [])

	useEffect(() => {
		// fetch list scripts
		const fetchListScripts = async () => {
			try {
				const res = await axiosConfig.get('/script/all')

				const dataScripts = res.data?.scripts.map((script: any) => ({
					key: script._id,
					name: script.name,
					urlFile: script.urlFile,
				}))

				setListScripts(dataScripts)
			} catch (error) {
				console.log(error)
			}
		}

		fetchListScripts()
	}, [])

	const onSubmit = async (values: any) => {
		// TODO: call api to add new campaign

		try {
			const res = await axiosConfig.post('/campaign/add', {
				customerGroupId: values.groupCustomer,
				scriptId: values.script,
				name: values.name,
			})

			message.success(res.data.message)

			fetchListCampaigns()
		} catch (error) {
			console.log(error)
		}
	}

	const handleAddNewCampaign = () => {
		form.submit()
	}

	const addNewScript = () => {
		// Trigger the hidden file input element
		// @ts-ignore
		document.getElementById('file-input').click()
	}

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			const formData = new FormData()
			formData.append('file', file)

			axiosConfig
				.post('/script/add', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					message.success('Add new script success!')

					const newScript = {
						key: res.data.script._id,
						name: res.data.script.name,
						urlFile: res.data.script.urlFile,
					}

					setListScripts([...listScripts, newScript])
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

	const deleteScript = async (key: string) => {
		try {
			const res = await axiosConfig.delete(`/script/delete/${key}`)

			message.success('Delete script success!')

			const newScripts = listScripts.filter(
				(script) => script.key !== key
			)

			setListScripts(newScripts)
		} catch (error) {
			console.log(error)
		}
	}

	const deleteCampaign = async (id: string) => {
		try {
			const res = await axiosConfig.delete(`/campaign/delete/${id}`)

			message.success('Delete campaign success!')

			const newCampaigns = listCampaigns.filter(
				(campaign) => campaign.id !== id
			)

			setListCampaigns(newCampaigns)
		} catch (error) {
			console.log(error)
		}
	}

	const handleViewDetailCampaign = (id: string) => {
		router.push(`/campaigns/${id}`)
	}

	return (
		<>
			<h1
				style={{
					fontSize: '2rem',
					fontWeight: 700,
					marginBottom: '1rem',
				}}
			>
				Campaigns
			</h1>
			<Space>
				<input
					id='file-input'
					type='file'
					accept='.json'
					style={{ display: 'none' }}
					onChange={handleFileUpload}
				/>
				<Button type='primary' onClick={addNewScript}>
					Add new script
				</Button>
			</Space>
			{/* show list script */}

			<Table
				style={{ marginTop: '1rem' }}
				dataSource={listScripts}
				columns={[
					{
						title: 'Name',
						dataIndex: 'name',
						key: 'name',
					},
					{
						title: 'URL File',
						dataIndex: 'urlFile',
						key: 'urlFile',
					},
					{
						title: 'Action',
						dataIndex: 'action',
						key: 'action',
						render: (text, record) => (
							<Button
								type='primary'
								danger
								onClick={() => deleteScript(record.key)}
							>
								Delete
							</Button>
						),
					},
				]}
				rowKey='key'
				bordered={true}
				scroll={{ x: '100%' }}
			/>
			{/* end show list script */}
			<div
				style={{
					marginTop: '1rem',
					border: '1px solid #ccc',
					padding: '1rem',
					borderRadius: '4px',
				}}
			>
				<Form form={form} layout='vertical' onFinish={onSubmit}>
					{/* input name campaign */}
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: 'Please input name campaign!',
							},
						]}
					>
						<Input placeholder='Input name campaign' />
					</Form.Item>
					{/* select group customer */}
					<Form.Item
						label='Group customer'
						name='groupCustomer'
						rules={[
							{
								required: true,
								message: 'Please select group customer!',
							},
						]}
					>
						<Select
							placeholder='Select group customer'
							style={{ width: '100%' }}
						>
							{listGroupCustomers.map((group: any) => (
								<Select.Option
									key={group.key}
									value={group.key}
								>
									{group.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					{/* select scripts */}
					<Form.Item
						label='Script'
						name='script'
						rules={[
							{
								required: true,
								message: 'Please select script!',
							},
						]}
					>
						<Select
							placeholder='Select script'
							style={{ width: '100%' }}
						>
							{listScripts.map((script: any) => (
								<Select.Option
									key={script.key}
									value={script.key}
								>
									{script.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Form>
				<Button type='primary' onClick={handleAddNewCampaign}>
					Add new campaign
				</Button>
				{/* Table list campaigns */}
				<Table
					style={{ marginTop: '1rem' }}
					dataSource={listCampaigns}
					columns={[
						{
							title: 'ID',
							dataIndex: 'id',
							key: 'id',
							width: 100,
						},
						{
							title: 'Group customer',
							dataIndex: 'groupCustomer',
							key: 'groupCustomer',
							width: 200,
						},
						{
							title: 'Name',
							dataIndex: 'name',
							key: 'name',
							width: 200,
						},
						{
							title: 'Script',
							dataIndex: 'script',
							key: 'script',
							width: 200,
						},
						{
							title: 'Status',
							dataIndex: 'status',
							key: 'status',
							width: 200,
						},
						{
							title: 'Action',
							dataIndex: 'action',
							key: 'action',
							render: (text, record) => (
								<Space>
									<Button
										type='primary'
										onClick={() =>
											handleViewDetailCampaign(record.id)
										}
									>
										Details
									</Button>
									<Button
										type='primary'
										danger
										onClick={() =>
											deleteCampaign(record.id)
										}
									>
										Delete
									</Button>
								</Space>
							),
						},
					]}
					rowKey='id'
					bordered={true}
					scroll={{ x: '100%' }}
				/>
			</div>
		</>
	)
}

export default Campaigns
