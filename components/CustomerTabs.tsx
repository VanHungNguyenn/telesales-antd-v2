import { Tabs } from 'antd'
import CustomerTable from './CustomerTable'

interface IGroup {
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

interface ICustomerTabsProps {
	groups: IGroup[]
	activeTab: string
	setActiveTab: (value: string) => void
}

const CustomerTabs: React.FC<ICustomerTabsProps> = ({
	groups,
	activeTab,
	setActiveTab,
}) => {
	const tabItems = groups.map((group) => {
		return {
			key: group.key,
			label: group.label,
			children: (
				<CustomerTable activeTabId={activeTab} idTab={group.key} />
			),
		}
	})

	return (
		<Tabs
			items={tabItems}
			activeKey={activeTab}
			onChange={(key) => {
				setActiveTab(key)
			}}
		/>
	)
}

export default CustomerTabs
