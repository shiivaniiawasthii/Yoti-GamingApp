"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"


export default function ResultScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const [responseData, setResponseData] = useState(null)


  useEffect(() => {
    const sessionStorageSavedUserData = sessionStorage.getItem("UserDetails")
    if (!sessionStorageSavedUserData) {
      router.replace("/")
      return
    }
    setUserName(JSON.parse(sessionStorageSavedUserData).userName)

    const sessionId = searchParams.get("sessionId")
    if (!sessionId) {
      setError("No session Id")
      setLoading(false)
      return
    }

    const FetchingResponse = async () => {
      try {

        const res = await fetch(`/api/get-status?sessionId=${sessionId}`)

        if (!res.ok) {
          setError("Result not available")
          setLoading(false)
          return

        }
        const data = await res.json()
        setResponseData(data)
        setLoading(false)
      }
      catch (err) {
        console.log(err, "-----------result error after verification")
        setError("Error found")
        setLoading(false)
      }
    }
    FetchingResponse()


  }, [router, searchParams])

  console.log("responsedat22222222222", responseData)


  const isSuccess = responseData?.status === "COMPLETE"
  // console.log("isSuccess----",isSuccess)

  if (loading) {
    return (<div className="bg-white  grid place-items-center p-5 text-center min-h-screen">
      <p className="text-black ">Getting verification Result.....</p>
    </div>)
  }

  if (error) {
    return (
      <div className="bg-white border-black p-5 grid place-items-center min-h-screen"><div>
        <p className="text-red-300">{error}</p>
        <button onClick={() => { router.push("/") }}
          className="text-white px-5 py-5 bg-sky-500 rounded-lg">Go back</button>
      </div></div>
    )
  }


  const SelectedMethod = () => {
    if (responseData?.age_estimation?.attempts > 0) return "Age Estimation"
    if (responseData?.doc_scan?.attemps > 0) return "ID Verification"
    if (responseData?.digital_id?.attempts > 0) return "Digital Id"
    return "-"
  }

  return (
    <div className="min-h-screen bg-white grid place-items-center p-4">
      <div className="w-full max-w-md grid gap-8">

        <div className="text-center">
          <h1 className=" text-black text-4xl font-bold ">
            Gaming Yoti
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg grid gap-6">

          <div className="grid gap-2 text-center">

            <h2 className="  text-black text-xl font-bold ">
              {isSuccess ? "Verfication complete" : "verification failed"}
            </h2>
            <p className="text-gray-500">

              {isSuccess ? ` Hey,${userName} Welcome to Gaming Yoti App` : "Try again"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 grid gap-3">

            <div className="grid grid-cols-2 items-center">
              <span className="text-gray-500 text-sm">Username</span>
              <span className="text-black text-sm  text-right">{userName}</span>
            </div>
            <div className="border-t border-gray-200" />

            <div className="grid grid-cols-2 items-center">
              <span className="text-gray-500 text-sm">Selected Method</span>
              <span className="text-black text-sm  text-right">{SelectedMethod()}</span>
            </div>
            <div className="border-t border-gray-200" />

            <div className="grid grid-cols-2 items-center">
              <span className="text-gray-500 text-sm">Timestamp</span>
              <span className="text-black text-sm  text-right">
                {new Date(responseData?.created_at).toString()}
              </span>
            </div>
            <div className="border-t border-gray-200" />

            <div className="grid grid-cols-2 items-center">
              <span className="text-gray-500 text-sm">Session Status</span>
              <div className="grid justify-end">
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}>
                  {responseData?.status}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200" />

            <div className="grid grid-cols-2 items-center">
              <span className="text-gray-500 text-sm">Session ID</span>
              <span className="text-gray-400 text-xs font-mono text-right">{responseData?.id}</span>
            </div>

          </div>

          {isSuccess && (
            <button
              onClick={() => router.push("/")}
              className="w-full bg-sky-500 text-white font-semibold py-3 rounded-lg transition hover:bg-sky-400  "
            >
              Go to 1st step
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

