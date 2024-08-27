import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              {" "}
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div>
              <div className="flex gap-2">
                <input type="checkbox" id="all" className="w-5" />
                <span>All</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="Art/Antiques" className="w-5" />
                <span>Art/Antiques</span>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <input type="checkbox" id="Vehicles" className="w-5" />
                <span>Vehicles</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="Jewelry/Watches" className="w-5" />
                <span>Jewelry/Watches</span>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <input type="checkbox" id="Technology" className="w-5" />
                <span>Technology</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="Immobilier" className="w-5" />
                <span>Immobilier</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select id="sort_order" className="border rounded-lg p-3">
              <option>Price high to low</option>
              <option>Price low to hight</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
      </div>
    </div>
  );
}
