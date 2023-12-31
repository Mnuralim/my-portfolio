const BASE_URL = process.env.BASE_URL

export const createPorto = async (body: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/portfolio`, {
      method: 'POST',
      body: body,
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getPortoData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/portfolio`, {
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getPortoById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/${id}`, {
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updatePorto = async (id: string, body: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/${id}`, {
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

export const deletePorto = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
