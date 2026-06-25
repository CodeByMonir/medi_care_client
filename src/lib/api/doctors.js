const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// to get doctors for public data from database
export const getDoctorsData = async (verification = "verified") => {
  const res = await fetch(
    `${baseUrl}/api/doctors?verification=${verification}`,
  );
  return res.json();
};

// to get doctors details public data from database
export const getDoctorDetails = async (license) => {
  const res = await fetch(`${baseUrl}/api/doctor?license=${license}`);
  return res.json();
};

// for get personal profile data
export const getDoctorData = async (doctorId) => {
  const res = await fetch(`${baseUrl}/api/doctor/${doctorId}`);
  return res.json();
};

// for update personal profile data
export const updateDoctorData = async (doctorId, updatedData) => {
  const res = await fetch(`${baseUrl}/api/doctor/${doctorId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();
};