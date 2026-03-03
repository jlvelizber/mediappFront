import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => ({
    redirect: {
        destination: "/doctor/settings?tab=availability",
        permanent: false,
    },
});

export default function DoctorAvailabilityRedirect() {
    return null;
}
