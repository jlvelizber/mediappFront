import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>¡Bienvenido al panel principal!</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}
