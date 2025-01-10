import React from "react";
import Slider from "react-slick"; // Carousel library
import { Card, CardContent, Typography, Button, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./RecommendedCourses.css";

const courses = [
  { id: 1, label: "New", title: "Empower Your Team", sessions: "10 sessions" },
  { id: 2, label: "Sale", title: "Mastering Influence", sessions: "5 sessions" },
  { id: 3, label: "Sale", title: "Effective Leadership", sessions: "8 sessions" },
  { id: 4, label: "New", title: "Team Collaboration", sessions: "6 sessions" },
  { id: 5, label: "Sale", title: "Personal Growth", sessions: "7 sessions" },
];

const RecommendedCourses = () => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1, // Scroll one card at a time
    responsive: [
      {
        breakpoint: 768, // For tablets and below
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="recommended-courses">
      <Typography variant="h5" className="section-title">
        Recommended Courses
      </Typography>
      <Slider {...settings}>
        {courses.map((course) => (
          <Card key={course.id} className="course-card">
            <Badge
              badgeContent={course.label}
              color={course.label === "New" ? "success" : "error"}
              className="badge"
            />
            <CardContent>
              <Typography variant="h6" className="course-title">
                {course.title}
              </Typography>
              <Typography variant="body2" className="course-sessions">
                {course.sessions}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<ShoppingCartIcon />}
                className="enroll-button"
              >
                Enroll
              </Button>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default RecommendedCourses;
