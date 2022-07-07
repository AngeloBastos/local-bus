import api from "./api"

interface Response {
  token: string,
  user: object | null
}

export interface UserSignIn {
  email: string,
  password: string
}

export async function signIn (user: UserSignIn | null): Promise<Response> {
  try {
    const response = await api.post('/session', {
      email: user?.email,
      password: user?.password
    } as UserSignIn)
  
    return {
      user: response.data.user,
      token: response.data.token}
  } catch (error) {
    return { user: null, token: ''}
  }
}
