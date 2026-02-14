import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function NewArrivels() {
  const products = [
    {
      id: 1,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=1",
    },
    {
      id: 2,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=2",
    },
    {
      id: 3,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=3",
    },
    {
      id: 4,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=4",
    },
    {
      id: 5,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=5",
    },
    {
      id: 6,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=6",
    },
    {
      id: 7,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=7",
    },
    {
      id: 8,
      name: "Jacket",
      price: 120,
      image: "https://picsum.photos/100/100?random=8",
    },
  ];
  const [slidesToShow, setSlidesToShow] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 790) {
        setSlidesToShow(2);
      } 
      else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      }else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <div>
      <div className="text-center">
        <p className="text-2xl font-bold">Explore New Collection</p>
        <p className=" text-sm px-3 md:px-5 md:text-md my-3 text-gray-900">Discover the lastest styles Straight off the runway , freashly added to keep your wardrobe on the cutting edge of fashion</p>
      </div>
      
    <Slider {...settings} className="mb-10">
      {products.map((item) => (
        <Link to={`/product/${item.id}`} key={item.id} className="px-3 p-10">
          <div className="relative w-full overflow-hidden rounded-xl shadow-xl">
          <img src={item.image} className="w-full h-75 object-cover" />
          <div className="absolute bottom-0 left-0 p-3 w-full bg-black/40 backdrop-blur-2xl text-white">
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        </div>
        </Link>
      ))}
    </Slider>
    </div>
  );
}

export default NewArrivels;
