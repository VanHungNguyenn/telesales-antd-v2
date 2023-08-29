'use client'
import React from 'react'
import { Modal } from 'antd'
import { Form, Input, message } from 'antd'
import { axiosConfig } from '@/api/apiConfig'

interface IAddNewModalProps {
	showAddNewModal: boolean
	setShowAddNewModal: (value: boolean) => void
	activeTabId: string
}

const AddNewModal = ({
	activeTabId,
	showAddNewModal,
	setShowAddNewModal,
}: IAddNewModalProps) => {
	const handleCancel = () => {
		setShowAddNewModal(false)
		form.resetFields()
	}

	const handleOK = () => {
		form.submit()
	}

	const [form] = Form.useForm()

	const onSubmit = async (values: any) => {
		try {
			const res = await axiosConfig.post('/customer/add', {
				name: values.name,
				phone: values.numberPhone,
				groupId: activeTabId,
			})

			message.success(res.data.message)
			setShowAddNewModal(false)
			form.resetFields()
		} catch (error) {
			message.error('Add new customer failed!')
		}
	}

	return (
		<>
			<Modal
				title='Add new customer'
				open={showAddNewModal}
				onOk={handleOK}
				onCancel={handleCancel}
				okText='Add'
			>
				<Form form={form} layout='vertical' onFinish={onSubmit}>
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{
								required: true,
								message: 'Please input customer name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Phone number'
						name='numberPhone'
						rules={[
							{
								required: true,
								message: 'Please input phone number!',
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

export default AddNewModal
