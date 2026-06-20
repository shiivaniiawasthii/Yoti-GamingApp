"use client"
import {useState} from "react"
import {useRouter} from "next/navigation"


const ChooseMthodToVerify = [
  {
    id:  "age_estimation",
    label:  "Age Estimation" ,
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

export default function VerificationPage(){



const [ selectOption,setSelectOption] = useState("age_estimation")
  const [loading, setLoading] = useState(false)


const router = useRouter()
const handleSubmit = (e)=>{
e.preventDefault()
setLoading(true)
console.log("form-data", formData)
router.push("/VerificationPage")
}

return(
<div>
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="https://cdn.aws.yoti.com/wp-content/uploads/yoti-logo.png" alt="Your Company" className="mx-auto h-10 w-auto" />
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Choose any of the Method to get VERIFY</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form   method="POST" className="space-y-6">

      <div className="grid gap-1">
            <h2 className="text-xl font-semibold text-white">Hi, User</h2>
            <p className="text-gray-500 text-sm">
              Choose a verification method to confirm you are 25+
            </p>
          </div>

          <div className="grid gap-3">
            {ChooseMthodToVerify.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectOption(method.id)}
                className={`grid grid-cols  gap-4 p-4 rounded-xl  items-start text-left transition ${
                  selectOption === method.id
                    ? "border-sky-500 bg-sky-50"
                    : "border-gray-200 bg-white hover:border-sky-300"
                }`}
              >
                <div className="grid gap-0.5">
                  <div className="grid grid-cols justify-start items-center gap-2">
                    <span className="text-black font-medium text-sm">{method.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      method.prefrence === "Recommended"
                        ? "bg-sky-100 text-sky-600"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {method.prefrence}
                    </span>
                  </div>
                </div>
                
              </button>
            ))}
          </div>

      <div>
<button
type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
    </form>

  </div>
</div>

</div>
)
}