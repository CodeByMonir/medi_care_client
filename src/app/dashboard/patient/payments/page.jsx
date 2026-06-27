// app/patient/payment-history/page.jsx (Server Component)
import { getPaymentData } from "@/src/lib/api/payments";
import { getUserSession } from "@/src/lib/core/session";
import PaymentHistoryClient from "./PaymentHistoryClient"; // আমরা ক্লায়েন্ট কোড আলাদা করব

export default async function Page() {
    const user = await getUserSession(); // এখানে next/headers ঠিকঠাক কাজ করবে
    const sessionId = user?.id;

    let initialTransactions = [];
    if (sessionId) {
        initialTransactions = await getPaymentData(sessionId);
    }

    return <PaymentHistoryClient initialTransactions={initialTransactions} />;
}