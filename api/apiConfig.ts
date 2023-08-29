import axios from 'axios'

export const axiosConfig = axios.create({
	baseURL: 'https://telesale.nguyenvanhung.xyz/api',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})
