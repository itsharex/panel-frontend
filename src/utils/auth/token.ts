import { getLocal, getLocalExpire, removeLocal, setLocal } from '@/utils'

const TOKEN_CODE = 'access_token'
/** token过期时间：2周 */
const DURATION = 60 * 60 * 24 * 14

export function getToken() {
  return getLocal(TOKEN_CODE)
}

export function setToken(token: string) {
  setLocal(TOKEN_CODE, token, DURATION)
}

export function removeToken() {
  removeLocal(TOKEN_CODE)
}
