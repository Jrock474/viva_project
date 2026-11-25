"use client"
import { useState } from "react"

const Home = () => {

  interface Payment {
    paymentId: string
    effectiveDate: string
    bankAccountId: string
    amount: number
}
    const [date, setDate] = useState("2024-06-28")
    const [continuationToken, setContinuationToken] = useState("START")
    const [payments, setPayments] = useState<Payment[]>([])

     const getPayments = async () => {
        const res = await fetch(`/api/payments?date=${date}&continuationToken=${continuationToken}`)
        const data = await res.json()

        return setPayments(data)
    }

    return (
      <>
     
      </>
    )
}

export default Home
