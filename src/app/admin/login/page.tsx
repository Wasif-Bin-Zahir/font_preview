'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function Login() {
   const { push } = useRouter()
   
   const { register, handleSubmit } = useForm({
      defaultValues: {
         email: '',
         password: ''
      }
   })

   const onSubmit = async (data: any) => {
      const res = await signIn('credentials', {
         email: data.email,
         password: data.password,
         redirect: false
      }).then((res) => {
         console.log(res)
         if (res && res.error) {
            toast.error(res.error)
         } else {
            push('/admin/dashboard')
            toast.success('Logged in successfully')
         }
      })
   }

   return (
      <div className="mx-auto my-16 max-w-sm">
         <h1 className="text-center text-xl leading-7">Admin Login</h1>
         <p className="text-center text-gray-300">
            Enter your email and password to login
         </p>

         <form className="my-7" onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
               <label htmlFor="email">Email</label>
               <input type="text" id="email" {...register('email')} />
            </div>

            <div className="my-3">
               <label htmlFor="password">Password</label>
               <input type="password" id="password" {...register('password')} />
            </div>

            <button className="my-3 w-full rounded bg-dark py-3 font-bold text-gray-50 transition-all duration-300 ease-out hover:contrast-200 active:scale-x-95">
               Login
            </button>
         </form>
      </div>
   )
}
