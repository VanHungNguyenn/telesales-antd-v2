import { Button, Space, Tag } from 'antd'

const columnsCustomerTable = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Number phone',
		dataIndex: 'numberPhone',
		key: 'numberPhone',
	},
	{
		title: 'Note',
		dataIndex: 'note',
		key: 'note',
	},
	{
		title: 'Labels',
		dataIndex: 'labels',
		key: 'labels',
		render: (labels: string[]) => {
			return (
				<>
					{labels?.map((label) => (
						<Tag key={label} color='green'>
							{label}
						</Tag>
					))}
				</>
			)
		},
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
		render: () => {
			return (
				<Space>
					<Button type='primary'>Edit</Button>
					<Button type='primary' danger>
						Delete
					</Button>
				</Space>
			)
		},
	},
]

export { columnsCustomerTable }
