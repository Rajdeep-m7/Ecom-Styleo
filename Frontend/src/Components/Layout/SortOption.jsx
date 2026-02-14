import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SortOption() {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSort = (e) => {
    const sortBy = e.target.value
    searchParams.set("sortBy", sortBy)
    setSearchParams(searchParams)
  }

  return (
    <div className="mb-4 flex mr-2 justify-end items-center gap-2">
      
      <label
        htmlFor="sort"
        className="text-sm font-medium text-gray-600"
      >
        Sort by
      </label>

      <select
        id="sort"
        onChange={handleSort}
        value={searchParams.get("sortBy") || ""}
        className="
          w-44 sm:w-56
          rounded-lg border border-gray-300
          bg-white px-3 py-2 text-sm
          shadow-sm
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
          transition duration-200
        "
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortOption
