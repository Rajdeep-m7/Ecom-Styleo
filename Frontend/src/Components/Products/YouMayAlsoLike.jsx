import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function YouMayAlsoLike({products}) {
  
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
        <Link to={`/product/${item.id}`} key={item.id} className='hover:scale-105 transition-transform duration-200'>
          
          <img src={item.image} className="w-32 h-40 sm:w-55 sm:h-65 object-cover rounded-md " />
          <div className=" font-semibold text-sm">
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        </Link>
        
      ))}
      </div>
    </div>
  );
}

export default YouMayAlsoLike