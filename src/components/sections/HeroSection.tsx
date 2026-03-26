import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[80vh] flex items-center justify-center flex-col bg-cover bg-center bg-[url('/images/hero.jpg')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white mb-10">
        <h1 className="font-extrabold font-tilt text-2xl sm:text-7xl">
          Taste the <span className="text-red-600 italic">extraordinary</span>
        </h1>
        <p className="text-sm sm:text-xl font-inter">
          Where culinary artistry meets unforgettable flavors in every bite
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full">
        <Link href={"/reservation"}>
          <Button variant={"reserve"} className={"font-inter font-light"}>
            Reserve Your Table
          </Button>
        </Link>
        <Link href={"/menu"}>
          <Button variant={"view_menu"} className={"font-inter font-light"}>
            View Menu
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
