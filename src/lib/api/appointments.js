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



// created to get appointment data by session id
export const getAppointmentsData = async (sessionId) => {
  const res = await fetch(`${baseUrl}/api/appointments?sessionId=${sessionId}`);
  return res.json();
}


// created to get appointment data by session id
export const getAppointmentData = async (id) => {
  const res = await fetch(`${baseUrl}/api/appointments/${id}`);
  return res.json();
}


// update appointments data by session id
export const updateAppointmentData = async (_id, updatedData) => {
  const res = await fetch(`${baseUrl}/api/appointments?_id=${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();
  return data;
};