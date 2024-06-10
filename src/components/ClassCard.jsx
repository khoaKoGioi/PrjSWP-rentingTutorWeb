import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const ClassCard = ({ imageLink, title, description }) => {
  return (
    <Card className="mt-6 w-80 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader color="blue-gray" className="relative h-48">
        <img
          src={imageLink}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
