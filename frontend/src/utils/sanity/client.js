import { createClient } from '@sanity/client'

//lese client
export const client = createClient({
    projectId: '3j0bfcpd',
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
})

//skrive klient v/behov med token
export const writeClient = createClient({
    token: 'skZH6g0Rmw0Z0CLqf3dQPm8BC3GPHdbOusf06vI249A4LBURltNWHeUglEamWPxaAR9DsBwnZeUYQS7s6BGlDHiJjcU287wr8RQw1RyETF2nKhvLNvQvojl9x9EYfTxcb1yLzK8n1N3rYNQOJ5FFTs0dBvAUyurbmDKBqOQbVOykwM59aCMs',
    projectId: '3j0bfcpd',
    dataset: "production"
})