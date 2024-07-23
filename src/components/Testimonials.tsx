const TestimonialsSection = () => (
  <section className="bg-gray-100 py-20">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-10 text-blue-900">
        What Our Users Say
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-blue-700">
              "This system has transformed how we handle petty cash!"
            </p>
            <p className="mt-4 text-right text-blue-900">- User A</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-blue-700">
              "A game-changer for our finance team."
            </p>
            <p className="mt-4 text-right text-blue-900">- User B</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
