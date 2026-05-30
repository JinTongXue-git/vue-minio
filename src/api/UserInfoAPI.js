import request from '@/http/Request.js'

export async function getUserInfos() {
  try {
    const data = await request.get('/api/users')
    return data
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

export function getUserInfo(id) {
  return request.get(`/api/user/${id}`)
}

export function getUserImage(id) {
  return request.get(`/api/user/image/${id}`)
}

export function getUserContract(id) {
  return request.get(`/api/user/contract/${id}`)
}
