const AboutSection = () => {
  return (
    <section className="w-[80%] mx-auto my-5 flex flex-col justify-center">
      <div className="flex flex-col md:flex-row gap-3 md:gap-5 h-1/2">
        <div className="w-full sm:w-[65%]">
          <h1 className="font-extrabold font-tilt text-sm sm:text-2xl md:text-4xl">
            Crafting Culinary Excellence Since 2025
          </h1>
          <p className="font-light text-[#2c2c2c] text-sm">
            At Flavore, we believe in the power of exceptional ingredients and
            masterful preparation . Our award-winning chefs create innovative
            dishes that celebrate both tradition and creativity{" "}
          </p>
        </div>

        <div className="relative w-fit mx-auto sm:mx-0">
          <img src="/images/chef.png" className="rounded-xl w-full" alt="" />

          {/* Badge */}
          <div className="absolute -bottom-1 -left-5 bg-red-600 text-white p-4 rounded-lg">
            <div className="text-xl font-bold">10K+</div>
            <div className="text-sm">Happy Customers</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full sm:w-[60%] mt-2 h-1/2">
        <div className="flex flex-col justify-center items-center text-center flex-1">
          <img src="./images/clock_icon.svg" alt="icon" />
          <h2 className="font-extrabold">Fresh Daily</h2>
          <p>Local ingredients sourced every morning</p>
        </div>
        <div className="flex flex-col justify-center items-center text-center flex-1">
          <img src="./images/clock_icon.svg" alt="icon" />
          <h2 className="font-extrabold">Fresh Daily</h2>
          <p>Local ingredients sourced every morning</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
