const AboutSection = () => {
  return (
    <section className="w-[80%] mx-auto my-5">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="w-[65%] h-1/2">
          <h1 className="font-extrabold font-tilt text-lg sm:text-2xl md:text-4xl">
            Crafting Culinary Excellence Since 2025
          </h1>
          <p className="font-light text-[#2c2c2c]">
            At Flavore, we believe in the power of exceptional ingredients and
            masterful preparation . Our award-winning chefs create innovative
            dishes that celebrate both tradition and creativity{" "}
          </p>
        </div>

        <div className="relative">
          <img
            src="/images/chef.png"
            className="rounded-xl w-full object-cover"
            alt=""
          />

          {/* Badge */}
          <div className="absolute -bottom-10 -left-5 bg-red-600 text-white p-4 rounded-lg">
            <div className="text-xl font-bold">10K+</div>
            <div className="text-sm">Happy Customers</div>
          </div>
        </div>
      </div>
      <div className="h-1/2 flex justify-center gap-20 w-[60%]">
        <div>
            <img src="" alt="" />
        </div>
        <div>Card</div>
      </div>
    </section>
  );
};

export default AboutSection;
