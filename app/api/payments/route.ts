import { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {


    const url = `${process.env.API_BASE_URL}/payments?date=${date}&continuationToken=${continuationToken}`
    const apiToken = process.env.API_TOKEN

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${apiToken}`
        }
    })

    const data = await res.json()

    return Response.json(data)
}
