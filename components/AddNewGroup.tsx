'use client'
import React from 'react'
import { Modal } from 'antd'
import { Form, Input, message } from 'antd'
import { axiosConfig } from '@/api/apiConfig'
import { IGroup } from '@/app/customers/page'

interface IAddNewGroupProps {
	showAddNewGroup: boolean
	setShowAddNewGroup: (value: boolean) => void
	addNewGroup: (newGroup: IGroup) => void
}

const AddNewGroup = ({
	showAddNewGroup,
	setShowAddNewGroup,
	addNewGroup,
}: IAddNewGroupProps) => {
	const handleCancel = () => {
		setShowAddNewGroup(false)
		form.resetFields()
	}

	const handleOK = () => {
		form.submit()
	}

	const [form] = Form.useForm()

	const onSubmit = async (values: any) => {
		try {
			const res = await axiosConfig.post('/customer-group/add', {
				name: values.nameGroup,
			})

			const newGroup: IGroup = {
				key: res.data.newCustomerGroup._id,
				label: res.data.newCustomerGroup.name,
				data: [],
			}

			addNewGroup(newGroup)
			message.success(res.data.message)
			setShowAddNewGroup(false)
			form.resetFields()
		} catch (error: any) {
			message.error(error.response.data.message)
		}
	}

	return (
		<>
			<Modal
				title='Add new group'
				open={showAddNewGroup}
				onOk={handleOK}
				onCancel={handleCancel}
				okText='Add'
			>
				<Form form={form} layout='vertical' onFinish={onSubmit}>
					<Form.Item
						label='Name of group'
						name='nameGroup'
						rules={[
							{
								required: true,
								message: 'Please input name of group!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default AddNewGroup
