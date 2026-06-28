import { getAppointmentsData } from "@/src/lib/api/appointments";
import { getUserSession } from "@/src/lib/core/session";
import AppointmentRequestPage from "./DoctorRequestsPage";

export default async function HomePage() {
    const user = await getUserSession();
    const sessionId = user?.id;

    let initialAppointments = [];
    if (sessionId) {
        initialAppointments = await getAppointmentsData(sessionId);
    }

    return (
        <AppointmentRequestPage
            initialAppointments={initialAppointments}
        />
    );
}