'use server'

import Font from '@/models/Font'
import { revalidatePath } from 'next/cache'

export default async function toggleApproval(id: string, status: boolean) {
   await Font.updateOne({ _id: id }, { status })
   revalidatePath('/admin/dashboard')
   return
}
