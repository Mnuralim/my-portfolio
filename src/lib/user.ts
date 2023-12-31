const BASE_URL = process.env.BASE_URL
export const getUserData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (id: string, body: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PATCH',
      body: body,
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
