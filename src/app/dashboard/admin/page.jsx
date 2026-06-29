import { getAllAppointments, getAllReviewData, getPatientsData } from '@/src/lib/api/admin';
import { getDoctorsData } from '@/src/lib/api/doctors';
import React from 'react';

const HomePage = async () => {

    const reviewData = await getAllReviewData(); // it is a array of object it has reviewData?.doctorId
    // reviewData = {doctorId, rating,}

    const doctorData = await getDoctorsData();// it is a array of object it has doctorData?.doctorId
    // doctorData = {doctorId, name}

    // now how can i match this both array object by doctorId so i can show both data in one map

    const role = "patient"

    const patientData = await getPatientsData(role)

    const appointmentData = await getAllAppointments()

    return (
        <div>
            <div>total review: {reviewData?.length}</div>
            <div>total doctor: {doctorData?.length}</div>
            <div>total doctor: {patientData?.length}</div>
            <div>total Appointment: {appointmentData?.length}</div>

        </div>
    );
};

export default HomePage;