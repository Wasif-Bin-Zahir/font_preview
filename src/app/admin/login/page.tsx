"use client"
import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <button
        onClick={() => signIn("google")}
        className=" py-3 px-7 border shadow"
      >
        Login with google
      </button>
    </div>
  )
}
