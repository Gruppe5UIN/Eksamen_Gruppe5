import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: '3j0bfcpd',
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
})