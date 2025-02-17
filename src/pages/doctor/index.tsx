import { DashboardLayout } from "@/app/components";
import { useLayout } from "@/app/context";
import { useEffect } from "react";


export default function Index() {

  const TITLE_PAGE = "Dashboard";

  const { setTitlePage } = useLayout();

  useEffect(() => setTitlePage(TITLE_PAGE), [setTitlePage])

  return (
    <DashboardLayout>¡Bienvenidos Dosctores!  </DashboardLayout>
  )
}