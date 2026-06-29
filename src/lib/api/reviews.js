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


export const getReviewData = async (sessionId) => {
  const res = await fetch(`${baseUrl}/api/reviews?sessionId=${sessionId}`);
  return res.json();
}

export const deleteReviewData = async (id) => {
  const res = await fetch(`${baseUrl}/api/reviews/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()
}

export const updateReviewData = async (_id, updatedData) => {
  // console.log(_id, updatedData)
  const res = await fetch(`${baseUrl}/api/reviews?_id=${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();
  return data;
};