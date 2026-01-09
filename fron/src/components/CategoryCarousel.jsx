import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "UI/UX Designer",
  "Graphic Designer",
  "Mobile App Developer",
  "Cloud Engineer",
  "DevOps Engineer",
  "Cyber Security Analyst",
  "Business Analyst",
  "Digital Marketing Specialist",
  "Product Manager",
  "QA / Test Engineer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-14 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Browse by <span className="text-[#6A38C2]">Category</span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Quick access to popular job roles
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent className="-ml-3">

            {categories.map((cat, index) => (
              <CarouselItem
                key={index}
                className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <button
                  onClick={() => searchJobHandler(cat)}
                  className="
                    w-full truncate
                    rounded-full border border-gray-200 bg-white
                    px-3 py-2 text-xs sm:text-sm font-medium text-gray-700
                    transition
                    hover:border-[#6A38C2] hover:text-[#6A38C2]
                    hover:bg-[#F5F0FF]
                  "
                  title={cat}
                >
                  {cat}
                </button>
              </CarouselItem>
            ))}

          </CarouselContent>

          <CarouselPrevious className="left-[-1.5rem]" />
          <CarouselNext className="right-[-1.5rem]" />
        </Carousel>

      </div>
    </section>
  );
};

export default CategoryCarousel;
