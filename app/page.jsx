"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {

  const [formData, setFormData] = useState({ userName: "", email: "", password: "" })
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("form-data", formData)
    sessionStorage.setItem("UserDetails", JSON.stringify({ userName: formData?.userName, email: formData?.email }))

    router.push("/VerificationPage")
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src="https://cdn.aws.yoti.com/wp-content/uploads/yoti-logo.png" alt="Your Company" className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6 border border-white p-4 rounded-xl">

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">UserName</label>
              <div className="mt-2">
                <input onChange={(e) => { setFormData({ ...formData, userName: e.target.value }) }} value={formData?.userName} id="userName" type="text" name="UserName" required autoComplete="text" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email address</label>
              <div className="mt-2">
                <input onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} value={formData?.email} id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>

              </div>
              <div className="mt-2">
                <input onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} value={formData?.password} id="password" type="password" name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">Sign Up</button>
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}