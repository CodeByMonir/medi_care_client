const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDoctorsData = async (verification = "verified") => {
  const res = await fetch(
    `${baseUrl}/api/doctors?verification=${verification}`,
  );
  return res.json();
};


export const getDoctorData = async (doctorId) => {
  const res = await fetch(
    `${baseUrl}/api/doctor?doctorId=${doctorId}`
  );
  return res.json();
}
