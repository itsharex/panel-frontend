import {request} from '@/utils'

export default {
  // 登录
  login: (username: string, password: string) => request.post('/user/login', {
    data: {
      username,
      password
    }
  }),
  // 获取用户信息
  refreshToken: () => request.get('/user/info')
}
