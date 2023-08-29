import { Table } from 'antd'
import { columnsCustomerTable } from '@/constants/columnTables'
import { useState, useEffect } from 'react'
import { axiosConfig } from '@/api/apiConfig'

interface ICustomerTableProps {
	activeTabId: string
	idTab: string
}

const CustomerTable: React.FC<ICustomerTableProps> = ({
	activeTabId,
	idTab,
}) => {
	const [dataTable, setDataTable] = useState([])

	useEffect(() => {
		if (activeTabId === idTab) {
			const fetchDataCumtomers = async () => {
				try {
					const res = await axiosConfig.get(
						`/customer/all?groupId=${activeTabId}`
					)

					const dataCustomers = res.data.customers.map(
						(customer: any) => ({
							id: customer._id,
							name: customer.name,
							numberPhone: customer.phone,
							note: customer.note,
							labels: customer.labels,
							status: customer.status,
						})
					)

					setDataTable(dataCustomers)
				} catch (error) {
					console.log(error)
				}
			}

			fetchDataCumtomers()
		}
	}, [activeTabId, idTab])

	return (
		<Table
			dataSource={dataTable}
			columns={columnsCustomerTable}
			rowKey='id'
			bordered={true}
			scroll={{ x: '100%' }}
		/>
	)
}

export default CustomerTable
