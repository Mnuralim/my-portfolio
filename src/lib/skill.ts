const BASE_URL = process.env.BASE_URL

export const createSkill = async (body: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/skills`, {
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

export const getSkillData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/skills`, {
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getSkillById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/skills/${id}`, {
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteSkill = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateSkill = async (id: string, body: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/skills/${id}`, {
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
