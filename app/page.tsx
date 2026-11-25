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
    const [showFilter, setShowFilter] = useState(false)
    const [refresh, setRefresh] = useState(0)

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
      <main className="payments-container">
    <div className="payments-toolbar">
        <div className="filter-wrapper">
            <button
                className="toolbar-button"
                onClick={() => setShowFilter(!showFilter)}
            >
                Filter: {date === "2024-06-28" ? "June 28" : "June 14"} ▾
            </button>

            {showFilter && (
                <div className="filter-menu">
                    <button onClick={() => {
                        setDate("2024-06-14")
                        setShowFilter(false)
                    }}>
                        June 14, 2024
                    </button>

                    <button onClick={() => {
                        setDate("2024-06-28")
                        setShowFilter(false)
                    }}>
                        June 28, 2024
                    </button>
                </div>
            )}
        </div>

        <button
            className="toolbar-button"
            onClick={() => setRefresh(refresh + 1)}
        >
            ↻ Refresh
        </button>
    </div>

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
</main>
      </>
    )
}

export default Home
