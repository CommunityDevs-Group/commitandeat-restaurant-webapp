import { Button } from "../ui/button";
import Image from "next/image";

const Chefs_Speciealties_Section = () => {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h2 className="text-2xl md:text-4xl font-extrabold font-tilt text-black">
          Chef’s Spelcialties
        </h2>
        <p className="font-inter text-gray-600">
          Discover our most beloved dishes, crafted with passion and served with
          pride
        </p>
      </div>

      <div className="container mx-auto place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div className="flex flex-col justify-center max-w-65 h-90 space-y-2 cursor-pointer group">
          <div className="overflow-hidden rounded-t-xl">
            <Image
              src={"/images/card1.png"}
              width={500}
              height={500}
              alt="California Sushi Roll"
              className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="flex flex-col grow p-2">
            <h3 className="text-center font-bold font-tilt">
              California Sushi Roll
            </h3>
            <p className="p-2 font-inter font-light text-gray-600">
              The starting point of your love for sushi! Our signature dish,
              prepared with the freshest ingredients
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              className={
                "bg-red-600 text-white cursor-pointer font-inter hover:bg-red-700 transition duration-200"
              }
            >
              Add to cart
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center max-w-65 h-90 space-y-2 cursor-pointer group">
          <div className="overflow-hidden rounded-t-xl">
            <Image
              src={"/images/card2.png"}
              width={500}
              height={500}
              alt="Veggie-Grill"
              className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="flex flex-col grow p-2">
            <h3 className="text-center font-bold font-tilt">Veggie-Grill</h3>
            <p className="p-2 font-inter font-light text-gray-600">
              Golden grilled cheese, spicy rice, and fresh vegetables. A
              signature flavor balanced with our special sauce.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              className={
                "bg-red-600 text-white cursor-pointer font-inter hover:bg-red-700 transition duration-200"
              }
            >
              Add to cart
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center max-w-65 h-90 space-y-2 cursor-pointer group">
          <div className="overflow-hidden rounded-t-xl">
            <Image
              src={"/images/card3.png"}
              width={500}
              height={500}
              alt="Uttapam"
              className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>

          <div className="flex flex-col grow p-2">
            <h3 className="text-center font-bold font-tilt">Uttapam</h3>
            <p className="p-2 font-inter font-light text-gray-600">
              Layers of spicy vegetables, touches of fresh produce, and a
              special dipping sauce served alongside.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              className={
                "bg-red-600 text-white cursor-pointer font-inter hover:bg-red-700 transition duration-200"
              }
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chefs_Speciealties_Section;
