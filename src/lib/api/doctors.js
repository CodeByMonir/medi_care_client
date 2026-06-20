const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDoctorsData = async (doctorId, verification = "pending") => {
  const res = await fetch(
    `${baseUrl}/api/doctors?doctorId=${doctorId}&verification=${verification}`,
  );
  return res.json();
};
