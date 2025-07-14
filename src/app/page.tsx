import Image from "next/image";
import BearSVG from "./components/svg/bear";
import HomeComponent from "./components/home";

export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <HomeComponent/>  
    </main>
  );
}
