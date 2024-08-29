import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Contact from "../components/Contact";
import Bid from "../components/Bid";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [biding, setBiding] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const [bid, setBid] = useState(false);
  const [reloaded, setReloaded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [auctionEnded, setAuctionEnded] = useState(false); // Track auction end state
  const params = useParams();

  useEffect(() => {
    const fetchListingAndBiding = async () => {
      try {
        setLoading(true);

        // Fetch listing data
        const listingRes = await fetch(`/api/listing/get/${params.listingId}`);
        const listingData = await listingRes.json();
        if (listingData.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(listingData);

        // Fetch bidding data
        const bidingRes = await fetch(`/api/biding/get/${params.listingId}`);
        const bidingData = await bidingRes.json();
        if (bidingData.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setBiding(bidingData || []);
        setLoading(false);

        // Determine highest bidder
        const highestBidDetails = bidingData.reduce(
          (highest, bid) => {
            if (bid.bidingPrice > highest.bidingPrice) {
              return bid;
            }
            return highest;
          },
          { bidingPrice: 0 }
        );

        const highestBidder = highestBidDetails.userRef;
        if (highestBidder) {
          // Fetch winner data
          const winnerRes = await fetch(`/api/user/${highestBidder}`);
          const winnerData = await winnerRes.json();
          setWinner(winnerData);
        }

        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListingAndBiding();
  }, [params.listingId]);

  const highestBid =
    biding.length > 0 ? Math.max(...biding.map((bid) => bid.bidingPrice)) : 0;

  const updateListingAvailability = async () => {
    if (!reloaded) {
      try {
        const res = await fetch(`/api/listing/update/${listing._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            available: false,
          }),
        });
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        } else {
          setReloaded(true);
          setListing((prevListing) => ({
            ...prevListing,
            available: false,
          }));
          setAuctionEnded(true); // Set auction ended state
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

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
              {listing.name} - {listing.reservedPrice.toLocaleString("en-US")}€
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
              <span className="font-semibold text-black">
                Current auction highest price :{" "}
                <span className="text-green-700">{highestBid} €</span>
              </span>
            </p>
            <p className="text-xl flex gap-2">
              <span className="font-semibold text-black">Time left : </span>
              <Countdown
                className="font-semibold text-red-700"
                date={new Date(listing.auctionEndingDate)}
                onComplete={updateListingAvailability}
              >
                <h1 className="text-xl font-semibold text-red-700">
                  The bid is finished! - the Winner is{" "}
                  {auctionEnded && winner ? winner.fullname : "No one"}
                </h1>
              </Countdown>
            </p>
            {currentUser &&
              listing.userRef !== currentUser._id &&
              listing.available &&
              !bid && (
                <button
                  onClick={() => setBid(true)}
                  className="bg-green-700 text-white rounded-lg uppercase hover:opacity-65 p-3"
                >
                  Participate in this Auction
                </button>
              )}
            {bid && <Bid listing={listing} currentHighestBid={highestBid} />}
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
