'use client'
import { Button } from '@/components/ui/button'
import { customRevalidatePath } from '@/lib/action'
import { deleteSkill } from '@/lib/skill'
import React from 'react'

const DeleteButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    try {
      const result = confirm('Are sure to delete this item?')
      if (result) {
        const response = await deleteSkill(id)
        if (response?.ok) {
          alert('Success delete this item')
          customRevalidatePath('/admin/skill')
        } else {
          throw new Error(response.message)
        }
      } else {
        alert('cancelled')
      }
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}

export default DeleteButton
