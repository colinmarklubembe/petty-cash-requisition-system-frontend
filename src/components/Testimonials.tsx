const TestimonialsSection = () => (
  <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-20">
    <div className="container mx-auto text-center">
      <h2 className="text-5xl font-extrabold mb-12 text-blue-900 animate-fade-in-down">
        What Our Users Say
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 ease-in-out animate-fade-in-up">
            <p className="text-blue-700 text-lg italic">
              "This system has transformed how we handle petty cash!"
            </p>
            <p className="mt-6 text-right text-blue-900 font-semibold text-lg">
              - User A
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300 ease-in-out animate-fade-in-up">
            <p className="text-blue-700 text-lg italic">
              "A game-changer for our finance team."
            </p>
            <p className="mt-6 text-right text-blue-900 font-semibold text-lg">
              - User B
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
