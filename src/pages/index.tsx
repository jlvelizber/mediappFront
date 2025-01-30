import { routeNames } from "@/app/routes"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push(routeNames.login)
  }, [router])


  return (
    <div>¡Bienvenido al panel principal!</div>
  )
}