import DataDistributionChart from '@/src/components/admin/DataDistributionChart';
import DoctorPerformanceChart from '@/src/components/admin/DoctorPerformanceChart';
import { getAllAppointments, getAllReviewData, getPatientsData } from '@/src/lib/api/admin';
import { getDoctorsData } from '@/src/lib/api/doctors';
import React from 'react';

const HomePage = async () => {
    const [reviewData, doctorData, patientData, appointmentData] = await Promise.all([
        getAllReviewData(),
        getDoctorsData(),
        getPatientsData(),
        getAllAppointments()
    ]);

    // Data merging for Doctor Performance Bar Chart
    const doctorMap = new Map(doctorData?.map(doc => [doc.doctorId, doc]));
    const doctorStats = {};

    reviewData?.forEach(review => {
        const docId = review.doctorId;
        const rating = Number(review.rating) || 0;

        if (!doctorStats[docId]) {
            const doctorDetails = doctorMap.get(docId);
            doctorStats[docId] = {
                name: doctorDetails?.name || `Unknown (${docId})`,
                totalRatingSum: 0,
                reviewCount: 0
            };
        }
        doctorStats[docId].totalRatingSum += rating;
        doctorStats[docId].reviewCount += 1;
    });

    const barChartData = Object.values(doctorStats).map(doc => ({
        name: doc.name,
        avgRating: parseFloat((doc.totalRatingSum / doc.reviewCount).toFixed(1))
    }));

    const totalDoctors = doctorData?.length || 0;
    const totalPatients = patientData?.length || 0;
    const totalAppointments = appointmentData?.length || 0;
    const totalReviews = reviewData?.length || 0;

    return (
        <div style={pageStyle}>
            {/* Injecting CSS Variables that respond directly to your Navbar switch class */}
            <style dangerouslySetInnerHTML={{ __html: dynamicThemeStyles }} />

            <h1 style={titleStyle}>Admin Dashboard</h1>

            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={cardStyle}>
                    <p style={cardLabelStyle}>Total Doctors</p>
                    <p style={cardValueStyle}>{totalDoctors}</p>
                </div>
                <div style={cardStyle}>
                    <p style={cardLabelStyle}>Total Patients</p>
                    <p style={cardValueStyle}>{totalPatients}</p>
                </div>
                <div style={cardStyle}>
                    <p style={cardLabelStyle}>Total Appointments</p>
                    <p style={cardValueStyle}>{totalAppointments}</p>
                </div>
                <div style={cardStyle}>
                    <p style={cardLabelStyle}>Total Reviews Given</p>
                    <p style={cardValueStyle}>{totalReviews}</p>
                </div>
            </div>

            {/* Charts Layout Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                {/* 1. Bar Chart Block */}
                <div style={chartContainerStyle}>
                    <h2 style={chartTitleStyle}>Doctor Performance (Average Rating)</h2>
                    <div style={{ width: '100%', height: '320px' }}>
                        <DoctorPerformanceChart data={barChartData} />
                    </div>
                </div>

                {/* 2. Pie Chart Block */}
                <div style={chartContainerStyle}>
                    <h2 style={chartTitleStyle}>Data Distribution Overview</h2>
                    <div style={{ width: '100%', height: '320px' }}>
                        <DataDistributionChart
                            doctorCount={totalDoctors}
                            patientCount={totalPatients}
                            appointmentCount={totalAppointments}
                            reviewCount={totalReviews}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// CSS Rules reflecting your global theme class setup
const dynamicThemeStyles = `
  :root {
    --bg-page: #f9fafb;
    --bg-card: #ffffff;
    --border-color: #e5e7eb;
    --text-main: #111827;
    --text-muted: #6b7280;
  }
  
  /* Trigger dark tokens automatically if your global navbar appends a '.dark' class to html/body */
  html.dark, body.dark {
    --bg-page: #0b0f19;
    --bg-card: #151f32;
    --border-color: #222f47;
    --text-main: #f3f4f6;
    --text-muted: #9ca3af;
  }
`;

// Dynamic Styles matching token presets
const pageStyle = {
    padding: '24px',
    fontFamily: 'sans-serif',
    backgroundColor: 'var(--bg-page)',
    minHeight: '100vh',
    transition: 'background-color 0.2s ease, color 0.2s ease'
};

const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: 'var(--text-main)'
};

const cardStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid var(--border-color)',
    transition: 'background-color 0.2s ease, border-color 0.2s ease'
};

const chartContainerStyle = {
    backgroundColor: 'var(--bg-card)',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid var(--border-color)',
    transition: 'background-color 0.2s ease, border-color 0.2s ease'
};

const cardLabelStyle = { color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 8px 0', fontWeight: '500' };
const cardValueStyle = { color: 'var(--text-main)', fontSize: '28px', margin: '0', fontWeight: 'bold' };
const chartTitleStyle = { fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: 'var(--text-main)' };

export default HomePage;