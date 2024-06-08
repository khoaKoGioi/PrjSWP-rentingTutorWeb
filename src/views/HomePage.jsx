import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <MegaMenuWithHover />
      </header>

      <main className="container mx-auto px-4 py-20">
        <section className="text-center py-10 bg-blue-500 text-white rounded-lg mb-8">
          <h2 className="text-4xl font-bold mb-4">Find Your Perfect Tutor</h2>
          <p className="text-xl mb-8">
            Connecting students with experienced tutors for personalized
            learning.
          </p>
          <a
            href="#tutors"
            className="px-6 py-3 bg-white text-blue-500 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </a>
        </section>

        <section id="tutors" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Tutors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p>Mathematics</p>
              <p>$30/hr</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p>Physics</p>
              <p>$35/hr</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Alice Johnson</h3>
              <p>Chemistry</p>
              <p>$25/hr</p>
            </div>
          </div>
        </section>

        <section id="students" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Top Students</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Michael Brown</h3>
              <p>Grade: A</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Emily Davis</h3>
              <p>Grade: A</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Chris Wilson</h3>
              <p>Grade: A</p>
            </div>
          </div>
        </section>

        <section id="classes" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Available Classes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Calculus 101</h3>
              <p>By John Doe</p>
              <p>Price: $300</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Physics Basics</h3>
              <p>By Jane Smith</p>
              <p>Price: $350</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Chemistry for Beginners</h3>
              <p>By Alice Johnson</p>
              <p>Price: $250</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Tutor Renting Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
