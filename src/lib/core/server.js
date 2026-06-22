const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// for post any data to database
export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};