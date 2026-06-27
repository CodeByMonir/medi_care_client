const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createReviews = async (reviewData) => {
  const res = await fetch(`${baseUrl}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });
  const data = await res.json();

  return {
    success: res.ok,
    status: res.status,
    data: data,
  };
};


export const getReviewData = async (_id) => {
  const res = await fetch(`${baseUrl}/api/reviews?_id=${_id}`);
  return res.json();
}

export const deleteReviewData = async (id) => {
  const res = await fetch(`${baseUrl}/api/reviews/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()

}