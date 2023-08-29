'use client'
import React from 'react'
import navbar from '@/constants/navbar'
import { Layout, Menu, theme } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

const { Header, Content, Footer, Sider } = Layout

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { token } = theme.useToken()
	const { colorBgContainer } = token

	const router = useRouter()
	const pathname = usePathname()

	return (
		<Layout
			style={{
				minHeight: '100vh',
				background: colorBgContainer,
			}}
		>
			<Sider breakpoint='lg' collapsedWidth='0'>
				<div
					style={{
						color: 'white',
						textAlign: 'center',
						fontSize: '1.2rem',
						fontWeight: 'bold',
						padding: '1rem 0',
					}}
				>
					TELESALES SYSTEM
				</div>
				<Menu
					style={{
						minHeight: '100vh',
					}}
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[pathname.replace('/', '')]}
					items={navbar}
					// onClick={({ key }) => {
					// 	router.push(`/${key}`)
					// }}
					onSelect={({ key }) => {
						router.push(`/${key}`)
					}}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				/>
				<Content style={{ margin: '24px 16px 0' }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
						}}
					>
						{children}
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2023 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	)
}

export default MainLayout
