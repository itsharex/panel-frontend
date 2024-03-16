export interface ContainerList {
  command: string
  created: string
  id: string
  image: string
  image_id: string
  labels: {
    [key: string]: string
  }
  name: string
  ports: [
    {
      IP: string
      PrivatePort: number
      PublicPort: number
      Type: string
    }
  ]
  state: string
  status: string
}
