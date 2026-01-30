import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function YouMayAlsoLike() {
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
    <div className='mt-5' >
      <div className="text-center">
        <p className="text-3xl font-bold">you may also like</p>
      </div>
      <div className='flex gap-5 md:gap-10 py-10 p-5 flex-wrap grow items-center justify-center'>
      {products.map((item) => (
        <div key={item.id}>
          <div className="overflow-hidden rounded-xl shadow-xl">
          <img src={item.image} className="w-70 h-75 sm:w-60 sm:h-70 object-cover" />
          <div className=" bottom-0 left-0 p-3 bg-black/40 backdrop-blur-2xl text-white">
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default YouMayAlsoLike