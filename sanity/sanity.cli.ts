import {defineCliConfig} from 'sanity/cli'
import { createClient } from "@sanity/client"

export default defineCliConfig({
  api: {
    projectId: '3j0bfcpd',
    dataset: 'production'
  }
})


export const client = createClient({
  projectId: '3j0bfcpd',
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21"
})

export const writeClient = createClient({
  //deploy legges i env filer skjult 
  token: "skKsCbkOBtweRHHGYnIL6l3uUIPwlp951JlTAElmEjcTLJhFQfGAXPIDsZKmfjXjK04peAEcjQZkY10wlA49Tvdap4FsWUj7yNs0sZdfeH0sTkG0r2yxRefzJ3ETBdNCfnBwfRHgTPdEmECgUba4XYzqcYJSp1XGeOoht8tWX3H900UaMVFV",
  projectId: '3j0bfcpd',
  dataset: "production",
  useCdn: true,
  apiVersion: '2021-10-21'
})

