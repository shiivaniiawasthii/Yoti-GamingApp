import fs from "fs"
import path from "path"

export async function POST(req) {
    const { userName, sessionId } = await req.json()


    const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), "users.json"), "utf-8"))

    const alreadyUssedSessionId = users.find(user => user.sessionId === sessionId && user.username !== userName)
    if (alreadyUssedSessionId) return Response.json({ error: "This session Id is already used" })

    const IsSessionIDExist = users.findIndex(user => user.username === userName)
    if (IsSessionIDExist !== -1) {

        users[IsSessionIDExist].sessionId = sessionId
        fs.writeFileSync(path.join(process.cwd(), "users.json"), JSON.stringify(users))

    }
    return Response.json({ status: "ok" })



}
