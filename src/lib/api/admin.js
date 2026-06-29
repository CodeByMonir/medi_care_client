const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPatientsData = async () => {
  const res = await fetch(`${baseUrl}/api/users/role`);

  return await res.json();
};

export const deleteUserData = async (userId) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}`, {
    method: "DELETE",
  });
  const data = await res.json();
};

export const updateUserData = async (userId, updatedData) => {
  const res = await fetch(`${baseUrl}/api/users?userId=${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData), // updatedData is now { role: "suspended" }
  });

  return res.json();
};

export const doctorsData = async () => {
  const res = await fetch(`${baseUrl}/api/allDoctors`);

  return await res.json();
};

export const getAllAppointments = async () => {
  const res = await fetch(`${baseUrl}/api/allAppointments`);

  return await res.json();
};

export const getAllReviewData = async () => {
  const res = await fetch(`${baseUrl}/api/allReviews`);
  return res.json();
};


export const updateDoctorStatus = async (userId, updatedData) => {
  const res = await fetch(`${baseUrl}/api/doctors/verify?userId=${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return res.json();
};


export const getAllPaymentData = async () => {
  const res = await fetch(`${baseUrl}/api/allPayments`);
  return res.json();
};
