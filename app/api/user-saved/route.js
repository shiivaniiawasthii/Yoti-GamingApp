import fs from "fs"
import path from "path"

export async function POST(req) {
    const { userName, email, sessionId } = await req.json()
    const UserpathFile = path.join(process.cwd(), "users.json")
    const users = fs.existsSync(UserpathFile) ? JSON.parse(fs.readFileSync(UserpathFile, "utf-8")) : []
    const existinguser = users.findIndex(user => user?.username === userName)
    console.log(existinguser)
    if (existinguser !== -1) users[existinguser] = { username: userName, email, sessionId, status: "VERIFIED" }
    else users.push({ username: userName, email, sessionId, status: "VERIFIED" })
    fs.writeFileSync(UserpathFile, JSON.stringify(users, null, 2))
    return Response.json({ success: true })
}