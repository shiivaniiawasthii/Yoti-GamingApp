export async function POST(req){

// console.log(req,11111111111111111111111111)
const body = await req.json()
console.log(body.method,"<<<<<method")
const selectedOption = body.method || "age_estimation"

 const res = await fetch("https://age.yoti.com/api/v1/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_YOTI_AVS_API_KEY}` ,
      "Content-Type" : "application/json" ,
      "Yoti-Sdk-Id":  process.env.NEXT_PUBLIC_YOTI_AVS_SDK_ID,
    },
body: JSON.stringify({

  type: "OVER",
  ttl: 900,
  age_estimation: {
    allowed: selectedOption==="age_estimation",
    threshold: 21,
    level: "PASSIVE",
    retry_limit: 3
  },
  digital_id: {
    allowed: selectedOption==="digital_id",
    threshold: 18,
    age_estimation_allowed: true,
    age_estimation_threshold: 21,
    retry_limit: 3
  },
  doc_scan: {
    allowed: selectedOption==="doc_scan",
    threshold: 18,
    authenticity: "AUTO",
    preset_issuing_country: "IN",
    level: "PASSIVE",
    retry_limit: 3
  },
  
  reference_id: "gaming_yoti_registration",
  callback: {
    auto: true,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/ResultScreen`,
  },
   synchronous_checks: true

 })
})

 if (!res.ok) {
    const error = await res.json()
    return Response.json({ error },  { status: res.status })
  }

  const data = await res.json()
console.log(data, process.env. NEXT_PUBLIC_YOTI_AVS_SDK_ID,"response......")
  const sessionUrl = `https://age.yoti.com?sessionId=${data.id}&sdkId=${process.env. NEXT_PUBLIC_YOTI_AVS_SDK_ID}`
  return Response .json({ sessionUrl })

}
