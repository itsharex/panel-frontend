import { request } from '@/utils'
import type { AxiosResponse } from 'axios'

export default {
  // 保存文件内容
  save: (path: string, content: string): Promise<AxiosResponse<any>> =>
    request.post('/panel/file/save', { path, content })
}
