'use server'

import { serverMutation } from "../core/server"

export const createDoctor = async (doctorsData) => {
    return serverMutation("/api/doctors", doctorsData);
}

