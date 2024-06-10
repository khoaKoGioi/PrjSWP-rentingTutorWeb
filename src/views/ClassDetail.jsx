import React from 'react';
import { useLocation } from 'react-router-dom';
import { MegaMenuWithHover } from "../components/MegaMenuWithHover.jsx";
import { Typography, Card, CardBody } from '@material-tailwind/react';
import BreadcrumbsWithIcon from '../components/BreadCrumb.jsx';

const ClassDetail = () => {
  const location = useLocation();
  const { id, imageLink, title, tutor, description, lectures, rating, price } = location.state;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header>
        <MegaMenuWithHover />
      </header>
      <div className="container mx-auto p-4 pt-16">
        <div className="w-3/4 mb-4">
          <BreadcrumbsWithIcon pathnames={['Home', 'ClassList', `ClassDetail ${id}`]} />
        </div>
        <Card className="shadow-lg">
          <CardBody>
            <Typography variant="h3" className="mb-4">{title}</Typography>
            <img src={imageLink} alt={title} className="w-full h-64 object-cover mb-4" />
            <Typography variant="body1" className="mb-2">{description}</Typography>
            <Typography variant="body2" className="mb-2"><strong>Tutor:</strong> {tutor}</Typography>
            <Typography variant="body2" className="mb-2"><strong>Rating:</strong> {rating}</Typography>
            <Typography variant="body2" className="mb-2"><strong>Lectures:</strong> {lectures}</Typography>
            <Typography variant="body2" className="mb-2"><strong>Price per hour:</strong> ${price}</Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ClassDetail;
