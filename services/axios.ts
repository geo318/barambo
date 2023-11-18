import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/api/actions`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
