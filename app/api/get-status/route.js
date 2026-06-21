export async function GET(request){
const {searchParams} = new URL (request.url)


const sessionId = searchParams.get("sessionId")
console.log("sessionId",sessionId,searchParams)

 
if(!sessionId){
return Response.json({err: "Session Id is required"},{status:400})}


const res = await fetch(`https://age.yoti.com/api/v1/sessions/${sessionId}/result`,
  {
   method: "GET",
  headers:{
  "Authorization": `Bearer ${process.env.NEXT_PUBLIC_YOTI_AVS_API_KEY}`,
"Content-Type": "application/json",
"Yoti-SDK-Id": process.env.NEXT_PUBLIC_YOTI_AVS_SDK_ID
}


})
console.log(res,"--------get-status?route.js")
 if (!res.ok) {
    const error = await res.json()
    return Response.json({error}, {status: res.status })
  }

  const data = await res.json()
// console.log(Response.json(data))
  return Response.json(data)
}



