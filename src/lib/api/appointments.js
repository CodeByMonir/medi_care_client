const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// created for collect appointments data
export const createAppointments = async (appointmentData) => {
  const res = await fetch(`${baseUrl}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
  });

  return res.json();
};