"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"


const ChooseMthodToVerify = [
  {
    id: "age_estimation",
    label: "Age Estimation",
    prefrence: "Recommended"
  },
  {
    id: "id_verification",
    label: "ID Verification",
    prefrence: "Fallback"
  },
  {
    id: "digital_id",
    label: "Digital ID",
    prefrence: "Fallback"
  },
];

export default function VerificationPage() {


  const [userName, setUserName] = useState("")
  const [selectOption, setSelectOption] = useState("age_estimation")
  const [loading, setLoading] = useState(false)


  const router = useRouter()


  useEffect(() => {
    const sessionStorageSavedUserData = sessionStorage.getItem("UserDetails")
    // console.log(sessionStorageSavedUserData)
    if (!sessionStorageSavedUserData) {
      router.replace("/")
    }
    setUserName(JSON.parse(sessionStorageSavedUserData).userName)
  }, [router])


  const handleCreateSession = async (e) => {

    setLoading(true)
    // console.log("selected option ", selectOption)
    try {
      const res = await fetch("/api/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: selectOption })

      })
      const data = await res.json()
      // console.log(data?.sessionUrl,"----------------url")
      window.location.href = data?.sessionUrl

    }
    catch (err) {
      console.log("error-", err)
      setLoading(false)

    }


  }




  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src="https://cdn.aws.yoti.com/wp-content/uploads/yoti-logo.png" alt="Your Company" className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Choose any of the Method to get VERIFY</h2>
        </div>
        <div className="space-y-6">

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div >

              <div className="grid gap-1 ">
                <h2 className="text-xl font-semibold text-white">Hi, {userName ? userName : "User"}</h2>
                <p className="text-gray-500 text-sm py-2">
                  Choose a verification method to confirm you are 25+
                </p>
              </div >

              <div className="grid gap-3 border border-white p-4 rounded-xl">
                {ChooseMthodToVerify.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectOption(method.id)}
                    className={`grid grid-cols  gap-4 p-4 rounded-xl border-4 items-start text-left transition-all ${selectOption === method.id
                      ? "border-sky-700 bg-sky-50 ring ring-sky-700"
                      : "border-gray-200 bg-white hover:border-sky-900 hover:bg-gray-400"
                      }`}
                  >
                    <div className="grid gap-0.5">
                      <div className="grid grid-cols justify-start items-center gap-2">
                        <span className="text-black font-medium text-sm">{method.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${method.prefrence === "Recommended"
                          ? "border-sky-700 bg-sky-50 ring ring-sky-700"
                          : "bg-gray-100 text-gray-500"
                          }`}>
                          {method.prefrence}
                        </span>
                      </div>
                    </div>

                  </button>
                ))}
              </div>

              <div className="py-3">
                <button
                  type="submit"
                  onClick={handleCreateSession}
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 text-sm/6 font-semibold text-white hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {loading ? (
                    <div className="grid grid-cols items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Starting verification...!</span>
                    </div>
                  ) : (
                    "Start Verification"
                  )}
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>

    </div>
  )
}