import { useState } from "react";
import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";
import { Typography } from "@material-tailwind/react";
import ClassCard from "../components/ClassCard.jsx";
import { Pagination } from "@nextui-org/react";
import BreadcrumbsWithIcon from "../components/BreadCrumb.jsx";
import PriceRangeSlider from "../components/PriceRangeSlider.jsx"; // Import the PriceRangeSlider component
const getRandomRating = () => (Math.random() * 4 + 1).toFixed(1); // Generates a random rating between 1.0 and 5.0

// Function to generate a random price between $10 and $100 per hour
const getRandomPrice = () => (Math.random() * 90 + 10).toFixed(2);

const getlectures = () => Math.floor(Math.random() * 90 + 10);

const data = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1, // Add an id field
  imageLink: `https://picsum.photos/200/300?random=${index + 1}`,
  title: `Card Title ${index + 1}`,
  description: `Description for card ${index + 1}`,
  rating: getRandomRating(), // Generate random rating
  price: getRandomPrice(), // Generate random price
  lectures: getlectures(), // Generate random lectures
}));

const itemsPerPage = 12; // 4 rows with 3 items each

const ClassList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the data for the current page
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 pt-16">
      <header>
        <MegaMenuWithHover />
      </header>

      <div className="w-3/4 p-4 flex justify-between">
        <div>
          <BreadcrumbsWithIcon pathnames={["Home", "ClassList"]} />
          <Typography variant="h3" className="mt-2">
            Filters by
          </Typography>
        </div>
        <div className="flex items-end pl-10">
          <Typography variant="h3" className="mt-2">
            {/*eslint-disable-next-line react/no-unescaped-entities */}
            3,423 results for "react"
          </Typography>
        </div>
        <a href="/userProfile" color="white" className="font-medium">
          User Profile
        </a>
        <a href="/tutorProfile" color="white" className="font-medium">
          Tutor Profile
        </a>
      </div>

      <div className="flex">
        <aside className="w-1/4 p-4">
          {/* Include the PriceRangeSlider component */}
          <PriceRangeSlider onChange={(value) => console.log(value)} />

          <div className="mb-6">
            <Typography variant="h6">Filter by Rating</Typography>
            <div>
              <label>
                <input type="checkbox" /> 1 Star & Up
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> 2 Stars & Up
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> 3 Stars & Up
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> 4 Stars & Up
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> 5 Stars
              </label>
            </div>
          </div>
          <div>
            <Typography variant="h6">Filter by Duration</Typography>
            <div>
              <label>
                <input type="checkbox" /> Under 60 Minutes
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> Less Than 2 Hours
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> 1-4 Weeks
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> 1-3 Months
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" /> 3-6 Months
              </label>
            </div>
          </div>
        </aside>
        <main className="w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {currentData.map((item) => (
              <ClassCard
                key={item.id}
                id={item.id}
                imageLink={item.imageLink}
                title={item.title}
                tutor={item.title}
                description={item.description}
                rating={item.rating}
                price={item.price}
                lectures={item.lectures}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Pagination
              showControls
              total={totalPages}
              initialPage={currentPage}
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassList;
