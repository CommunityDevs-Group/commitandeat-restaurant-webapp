const AboutSection = () => {
  return (
    <section className="container mx-auto px-6 py-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-2 space-y-8 flex flex-col items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-extrabold font-tilt text-black leading-tight">
              Crafting Culinary Excellence Since
              <span className="block">2025</span>
            </h2>
            <p className="text-gray-600 font-inter text-md max-w-2xl leading-relaxed">
              At Flavore, we believe in the power of exceptional ingredients and
              masterful preparation. Our award-winning chefs create innovative
              dishes that celebrate both tradition and creativity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 pt-4">
            {/* Fresh Daily 1 */}
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <img src="/images/clock.svg" alt="clock" />
              <h4 className="font-bold font-tilt text-xl">Fresh Daily</h4>
              <p className="text-gray-500 font-inter max-w-50">
                Local ingredients sourced every morning
              </p>
            </div>

            {/* Fresh Daily 2 */}
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <img src="/images/trophy.svg" alt="trophy" />
              <h4 className="font-bold font-tilt text-xl">Fresh Daily</h4>
              <p className="text-gray-500 font-inter max-w-50">
                Recognized by culinary experts worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-1 mx-auto lg:mx-0 w-[80%] md:w-[60%] lg:w-full aspect-5/4">
          <div className="relative rounded-2xl overflow-hidden w-full h-full">
            <img
              src="/images/chef.png"
              alt="chef"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute -bottom-4 left-[-15%] bg-red-600 text-white 
      p-3 sm:p-4 md:p-6 rounded-xl shadow-xl 
      min-w-25 sm:min-w-35 text-center lg:text-left"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-tilt leading-tight">
              10K+
            </h3>

            <p className="text-[10px] sm:text-xs md:text-sm font-inter opacity-90 leading-tight">
              Happy Customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
