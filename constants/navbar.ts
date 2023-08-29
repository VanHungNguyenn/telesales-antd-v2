import { UserOutlined } from '@ant-design/icons'
import React from 'react'

const navbar = [
	{
		key: '',
		icon: React.createElement(UserOutlined),
		label: 'Dashboard',
	},
	{
		key: 'customers',
		icon: React.createElement(UserOutlined),
		label: 'Customers',
	},
	{
		key: 'campaigns',
		icon: React.createElement(UserOutlined),
		label: 'Campaigns',
	},
	{
		key: 'products',
		icon: React.createElement(UserOutlined),
		label: 'Products',
	},
]

export default navbar
