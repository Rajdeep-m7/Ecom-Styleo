import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function FilterSideBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const DEFAULT_FILTERS = {
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  };

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women"];
  const colors = ["Black", "White", "Red", "Blue", "Green", "Brown", "Gray"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Polyester", "Leather", "Denim", "Wool"];
  const brands = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Uniqlo"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });

    setPriceRange([
      Number(params.minPrice) || 0,
      Number(params.maxPrice) || 100,
    ]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    setFilters((prev) => ({
      ...prev,
      minPrice: 0,
      maxPrice: newPrice,
    }));
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPriceRange([0, 100]);
    setSearchParams({});
  };

  return (
    <div className=" w-full mb-10 ">
      <div className="flex items-center justify-between mb-3">
        <p className="text-lg font-semibold">Filters</p>

        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div>
        <p className="font-medium mb-2">Category</p>
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              name="category"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      <div>
        <p className="font-medium mb-2">Gender</p>
        {genders.map((gender) => (
          <label key={gender} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              name="gender"
            />
            <span>{gender}</span>
          </label>
        ))}
      </div>
      <div>
        <p className="font-medium mb-2">color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-600" : ""} `}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-medium mb-2">Size</p>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="h-4 w-4 mr-1 focus:ring-blue-600 "
            />
            <p>{size}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="font-medium mb-2">Material</p>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="h-4 w-4 mr-1 focus:ring-blue-600 "
            />
            <p>{material}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="font-medium mb-2">brand</p>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="h-4 w-4 mr-1 focus:ring-blue-600 "
            />
            <p>{brand}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="font-medium mb-2">Price Range</p>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          onMouseUp={() => {
            const newFilters = {
              ...filters,
              minPrice: 0,
              maxPrice: priceRange[1],
            };
            updateUrlParams(newFilters);
          }}
          onTouchEnd={() => {
            const newFilters = {
              ...filters,
              minPrice: 0,
              maxPrice: priceRange[1],
            };
            updateUrlParams(newFilters);
          }}
          className="w-full"
        />

        <div className="flex justify-between">
          <span>0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterSideBar;
