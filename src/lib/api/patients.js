const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createUserdata = async (userData) => {
  const res = await fetch(`${baseUrl}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};


export const getUserData = async (sessionId) => {
    const res = await fetch(`${baseUrl}/api/users?sessionId=${sessionId}`)
    return res.json();
}