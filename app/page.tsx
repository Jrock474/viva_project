"use client"
import { useEffect, useState } from "react"

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

    useEffect(() => {
        getPayments()
    }, [date])

    return (
      <>
      <div className="payments-container">
    <table className="payments-table">
        <thead>
            <tr>
                <th></th>
                <th>Effective Date</th>
                <th>Bank Account Id</th>
                <th>Amount</th>
            </tr>
        </thead>

        <tbody>
            {payments.map((payment) => (
                <tr key={payment.paymentId}>
                    <td className="status-cell">
                        <span className="status-icon">✓</span>
                    </td>

                    <td>
                        {new Date(`${payment.effectiveDate}T00:00:00`).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })}
                    </td>

                    <td>{payment.bankAccountId}</td>

                    <td className="amount-cell">
                        {payment.amount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
      </>
    )
}

export default Home
