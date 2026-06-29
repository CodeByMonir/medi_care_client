const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getPatientsData = async (role) => {
  try {
    const res = await fetch(`${baseUrl}/api/users/role?role=${role}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch failed completely:", err);
    return [];
  }
};

export const getAllAppointments = async () => {
 const res = await fetch(`${baseUrl}/api/allAppointments`);

    return await res.json();
};

export const getAllReviewData = async () => {
  const res = await fetch(`${baseUrl}/api/allReviews`);
  return res.json();
}