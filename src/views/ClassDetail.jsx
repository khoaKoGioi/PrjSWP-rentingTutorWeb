import React from "react";
import { useLocation } from "react-router-dom";
import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";
import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import BreadcrumbsWithIcon from "../components/BreadCrumb.jsx";
import user1 from "../assets/profile-pictures/user1.jpg";
import RatingWithComment from "../components/Rating.jsx";

export function CircularImg() {
  return (
    <img
      className="h-32 w-32 rounded-full object-cover object-center"
      src={user1}
      alt="Tutor Profile"
    />
  );
}

const ClassDetail = () => {
  const location = useLocation();
  const { id, imageLink, title, tutor, description, lectures, rating, price } =
    location.state;
  const otherClasses = [
    {
      id: 1,
      imageLink: "class1.jpg",
      name: "Class 1",
      description: "Description of Class 1",
    },
    {
      id: 2,
      imageLink: "class2.jpg",
      name: "Class 2",
      description: "Description of Class 2",
    },
    {
      id: 3,
      imageLink: "class3.jpg",
      name: "Class 3",
      description: "Description of Class 3",
    },
    // Add more classes here...
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header>
        <MegaMenuWithHover />
      </header>
      <div className="container mx-auto pl-4  flex flex-col md:flex-row gap-8">
        <div className=" w-full md:w-3/4 mb-4 flex flex-col  pt-16 ">
          <BreadcrumbsWithIcon
            pathnames={["Home", "ClassList", `ClassDetail ${id}`]}
          />
        </div>
      </div>

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4 mb-4 flex flex-col gap-4">
          <Card className="shadow-lg w-full">
            <CardBody className="flex flex-col md:flex-row items-start md:items-center gap-5 p-6">
              <div className="w-full md:w-1/2">
                <img
                  src={imageLink}
                  alt={title}
                  className="w-full h-64 object-cover mb-4 md:mb-0"
                />
              </div>
              <div className="w-full md:w-1/2">
                <Typography variant="h4" className="mb-4">
                  {title}
                </Typography>
                <Typography variant="body1" className="mb-4">
                  {description}
                </Typography>
                <Typography variant="body2" className="mb-2">
                  <strong>Tutor:</strong> {tutor}
                </Typography>
                <Typography variant="body2" className="mb-2">
                  <strong>Rating:</strong> {rating}
                </Typography>
                <Typography variant="body2" className="mb-2">
                  <strong>Available:</strong> Mon-Thu-Sat
                </Typography>
                <Typography variant="body2" className="mb-2">
                  <strong>Lectures:</strong> {lectures}
                </Typography>
                <Typography variant="body2" className="mb-2">
                  <strong>Price:</strong> ${price}
                </Typography>
                <Button className="w-50">Enroll now</Button>
              </div>
            </CardBody>
          </Card>
          <Card className="shadow-lg w-full">
            <CardBody>
              <Typography variant="h3" className="mb-2">
                All reviews
              </Typography>

              <RatingWithComment />
            </CardBody>
          </Card>
        </div>
        <div className="w-full md:w-1/4 pb-4">
          <Card className="shadow-lg h-full flex flex-col ">
            <CardBody className="flex flex-col items-center p-6 flex-grow">
              <CircularImg />
              <Typography variant="h5" className="mb-2">
                {tutor}
              </Typography>
              <Typography variant="body1" className="text-center">
                {description}
              </Typography>
              <Typography variant="body2" className="mt-4">
                <strong>Rating:</strong> {rating}
              </Typography>
              <Typography variant="body2">
                <strong>Lectures:</strong> {lectures}
              </Typography>
             
              <Button className="w-50 ">Request now</Button>
              <Typography variant="h5">More classes with {tutor}</Typography>
              <Card className="shadow-lg w-full max-h-80 overflow-y-auto">
                <CardBody>
                  {otherClasses.map((otherClass) => (
                    <Card key={otherClass.id} className="flex mb-4">
                      <div className="flex-none w-32">
                        <img
                          src={imageLink}
                          alt={otherClass.name}
                          className="w-full h-24 object-cover"
                        />
                      </div>
                      <div className="flex-grow p-4">
                        <Typography variant="h5" className="mb-2">
                          {otherClass.name}
                        </Typography>
                        <Typography variant="body1" className="mb-2">
                          {otherClass.description}
                        </Typography>
                      </div>
                    </Card>
                  ))}
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
