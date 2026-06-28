const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// created for collect appointments data
export const createPrescription = async (prescriptionData) => {
  const res = await fetch(`${baseUrl}/api/prescriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prescriptionData),
  });

  return res.json();
};

// created to get prescription data by session id
export const getPrescriptionsData = async (sessionId) => {
  const res = await fetch(
    `${baseUrl}/api/prescriptions?sessionId=${sessionId}`,
  );
  return res.json();
};
