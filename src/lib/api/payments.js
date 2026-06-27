const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// created for collect appointments data
export const createPayments = async (paymentData) => {
  console.log(paymentData);
  const res = await fetch(`${baseUrl}/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  return res.json();
};


// created to get data of payments
export const getPaymentData = async (sessionId) => {
  const res = await fetch(`${baseUrl}/api/payments?sessionId=${sessionId}`);
  return res.json();
};