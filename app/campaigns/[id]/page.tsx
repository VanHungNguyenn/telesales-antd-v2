'use client'
import React, { useEffect, useState } from 'react'

import { useRouter, usePathname } from 'next/navigation'
import { Button, Table } from 'antd'
import { axiosConfig } from '@/api/apiConfig'

const CampaignDetail = () => {
	const router = useRouter()
	const pathname = usePathname()
	const id = pathname.split('/')[2]
	const [callHistories, setCallHistories] = useState<any[]>([])

	useEffect(() => {
		const fetchCampaignDetail = async () => {
			try {
				const res = await axiosConfig.get(
					`/call-history/all?campaignId=${id}`
				)

				setCallHistories(res.data.callHistories)
			} catch (error) {
				console.log(error)
			}
		}

		fetchCampaignDetail()
	}, [id])

	return (
		<>
			<Button type='primary' onClick={() => router.push('/campaigns')}>
				Back to Campaigns
			</Button>
			<h1
				style={{
					textAlign: 'center',
					marginTop: '20px',
					marginBottom: '20px',
				}}
			>
				Campaign Detail
			</h1>
			<Table
				dataSource={callHistories}
				columns={[
					{
						title: 'ID',
						dataIndex: '_id',
						key: '_id',
					},
					{
						title: 'Call Duration',
						dataIndex: 'callDuration',
						key: 'callDuration',
					},
					{
						title: 'Customer ID',
						dataIndex: ['customerId', '_id'], // Use array for nested object path
						key: 'customerId',
					},
					{
						title: 'User Name',
						dataIndex: ['customerId', 'name'], // Use array for nested object path
						key: 'name',
					},
					{
						title: 'Phone',
						dataIndex: ['customerId', 'phone'], // Use array for nested object path
						key: 'phone',
					},
					{
						title: 'Status',
						dataIndex: 'status',
						key: 'status',
					},
					{
						title: 'Note',
						dataIndex: 'note',
						key: 'note',
					},
					{
						title: 'Record File',
						dataIndex: 'recordFileUrl',
						key: 'recordFileUrl',
						render: (url: string) => {
							let fileType = 'audio/wav'
							if (url.endsWith('.mp3')) {
								fileType = 'audio/mpeg'
							}

							return (
								<audio controls>
									<source
										src={`http://143.42.68.33:5004${url}`}
										type={fileType}
									/>
									Your browser does not support the audio
									element.
								</audio>
							)
						},
					},
				]}
				rowKey='_id'
			/>
		</>
	)
}

export default CampaignDetail
