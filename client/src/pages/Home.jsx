import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [typeListings, setTypeListings] = useState([]);

  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchTypeListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?type=all&sort=reservedPrice&order=asc&limit=3`
        );
        const data = await res.json();
        setTypeListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTypeListings();
  }, []);

  return (
    <div className="">
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find Your next <span className="text-slate-500">Dream</span>
          <br />
          bid with Ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          E-Enchères Your Fast, Easy, and Comfortable Path to Winning Bids, with
          Expert Support Always Available.
          <br />
          We have a wide range of articles for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {typeListings &&
          typeListings.length > 0 &&
          typeListings.map((listing) => (
            <SwiperSlide key={listing}>
              <div
                className="h-[500px]"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for type */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {typeListings && typeListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent articles
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=all"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-12">
              {typeListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
