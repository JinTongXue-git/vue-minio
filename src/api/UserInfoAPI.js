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


