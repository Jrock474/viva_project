"use client";
import { useEffect, useState } from "react";

const dummyPayments = [
  {
    paymentId: "payment-001",
    effectiveDate: "2024-06-28",
    bankAccountId: "3f9c1a2e-5b7d-4a3f-9c1a",
    amount: -199.99,
  },
  {
    paymentId: "payment-002",
    effectiveDate: "2024-06-28",
    bankAccountId: "b4e72f09-8c12-4d6b-a3e8",
    amount: 199.99,
  },
  {
    paymentId: "payment-003",
    effectiveDate: "2024-06-14",
    bankAccountId: "0a7f3c1b-2d9e-4b5a",
    amount: -49.99,
  },
  {
    paymentId: "payment-004",
    effectiveDate: "2024-06-14",
    bankAccountId: "d92e4f1c-7a6b-4c2e",
    amount: 5000,
  },
];

const Home = () => {
  interface Payment {
    paymentId: string;
    effectiveDate: string;
    bankAccountId: string;
    amount: number;
  }
  const [date, setDate] = useState("all");
  // TODO impliment a way to make the dates dynamic rather than hardcoding.
  const dates = date === "all" ? ["2024-06-14", "2024-06-28"] : [date];
  const [payments, setPayments] = useState<Payment[]>([]);
  // const [payments, setPayments] = useState<Payment[]>(dummyPayments)
  const [showFilter, setShowFilter] = useState(false);
  // TODO make a more refined way to refresh the payments rather than just incrementing a numbergit 
  const [refresh, setRefresh] = useState(0);

  const getPayments = async () => {
    const allPayments: Payment[] = [];

    for (const selectedDate of dates) {
      for (let continuationToken = "START"; continuationToken !== "END";) {
        const res = await fetch(
          `/api/payments?date=${selectedDate}&continuationToken=${continuationToken}`,
        );

        if (!res.ok) {
          console.error("Failed to fetch payments:");
        }

        const data = await res.json();

        console.log("Payment response:", data);

        if (!data.data) {
          throw new Error("No payment data returned");
        }

        allPayments.push(data.data);
        continuationToken = data.data.paginationToken;
      }
    }

    setPayments(allPayments);
  };

  useEffect(() => {
    getPayments();
  }, [date, refresh]);

  return (
    <>
      <main className="payments-container">
        <div className="payments-toolbar">
          <div className="filter-wrapper">
            <button
              className="toolbar-button"
              onClick={() => setShowFilter(!showFilter)}
            >
              Filter:{" "}
              {date === "2024-06-28"
                ? "June 28"
                : date === "2024-06-14"
                  ? "June 14"
                  : "All Dates"}{" "}
              ▾
            </button>

            {showFilter && (
              <div className="filter-menu">
                <button
                  onClick={() => {
                    setDate("all");
                    setShowFilter(false);
                  }}
                >
                  All Dates
                </button>
                <button
                  onClick={() => {
                    setDate("2024-06-14");
                    setShowFilter(false);
                  }}
                >
                  June 14, 2024
                </button>

                <button
                  onClick={() => {
                    setDate("2024-06-28");
                    setShowFilter(false);
                  }}
                >
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
            {(date === "all"
              ? payments
              : payments.filter((payment) => payment.effectiveDate === date)
            ).map((payment) => (
              <tr key={payment.paymentId}>
                <td className="status-cell">
                  <span className="status-icon">✓</span>
                </td>
                <td>
                  {new Date(
                    `${payment.effectiveDate}T00:00:00`,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>{payment.bankAccountId}</td>
                <td className="amount-cell">
                  {payment.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Home;
