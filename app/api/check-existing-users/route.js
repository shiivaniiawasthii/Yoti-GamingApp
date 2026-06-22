import fs from "fs"
import path from "path"

export async function POST(req) {
    const { userName, email } = await req.json()

    const users = fs.existsSync(path.join(process.cwd(), "users.json")) ? JSON.parse(fs.readFileSync(path.join(process.cwd(), "users.json"), "utf-8")) : []

    const IsExistUserName = users.find(user => user?.username === userName && user.status === "VERIFIED")
    if (IsExistUserName) return Response.json({ error: "Similar UserName exists" }, { status: 400 })

    const IsExistUserEmail = users.find(user => user?.email === email && user.status === "VERIFIED")
    if (IsExistUserEmail) return Response.json({ error: "Similar UserEmail exists" }, { status: 400 })

    const isUserExsistWithStatusPending = users.findIndex(user => user.username === userName && user.status === "PENDING")
    if (isUserExsistWithStatusPending !== -1) {
        users[isUserExsistWithStatusPending] = { username: userName, email, status: "PENDING" }
    }
    else { users.push({ username: userName, email, status: "PENDING" }) }
    fs.writeFileSync(path.join(process.cwd(), "users.json"), JSON.stringify(users, null, 2))
    return Response.json({ status: "ok" })



}