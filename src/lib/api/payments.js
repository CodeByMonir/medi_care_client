const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// created for collect appointments data
export const createPayments = async (paymentData) => {
  const res = await fetch(`${baseUrl}/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  return res.json();
};
