'use server'

import { serverMutation } from "../core/server"

export const createDoctor = async (doctorsData) => {
    return serverMutation("/api/doctors", doctorsData);
}

export const createAppointments = async (appointmentData) => {
    return serverMutation("/api/appointments", appointmentData);
}