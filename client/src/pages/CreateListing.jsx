import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function CreateListing() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="Art/Antiques" className="w-5" />
              <span>Art/Antiques</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Vehicles" className="w-5" />
              <span>Vehicles</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Jewelry/Watches" className="w-5" />
              <span>Jewelry/Watches</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="Technology" className="w-5" />
              <span>Technology</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="immobilier" className="w-5" />
              <span>Immobilier</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              id=""
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-col items-center">
              <p>Reserved Price</p>
              <span className="text-xs">(€)</span>
            </div>
          </div>
          <div className="flex flex-center items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="p-3 border border-gray-300 rounded-lg"
            />
            <p>Auction End Date</p>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal  text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
