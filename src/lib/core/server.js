import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return header;
}


// for post any data to database
export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ... await authHeader()
    },
    body: JSON.stringify(data),
  });

  return res.json();
};