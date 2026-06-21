'use server'

import { serverMutation } from "../core/server"

export const createDoctor = async (doctorsData) => {
    return serverMutation("/api/doctors", doctorsData);
}




// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createDoctor = async (doctorsData) => {
//     const res = await fetch(`${baseUrl}/api/doctors`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(doctorsData),
//     });
//     return res.json();
// }