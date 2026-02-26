import { GetServerSideProps } from "next";
import { routeNames } from "@/app/routes";

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: routeNames.doctors,
    permanent: false,
  },
});

export default function Home() {
  return null;
}