import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();

  const Completionist = () => (
    <h1 className="text-xl font-semibold text-red-700">The bid is finished!</h1>
  );

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {listing && !loading && !error && (
        <div className="mt-3 mb-36">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{ background: `url(${url}) center no-repeat` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
            <p className="text-2xl font-semibold">
              {listing.name} - {listing.reservedPrice}€
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Type - </span>
              {listing.type}
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <p className="text-xl flex gap-2">
              <span className="font-semibold text-black">Time left : </span>
              <Countdown
                className="font-semibold text-red-700"
                date={new Date(listing.auctionEndingDate)}
              >
                <Completionist />
              </Countdown>
            </p>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-65 p-3"
              >
                Contact the owner
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
