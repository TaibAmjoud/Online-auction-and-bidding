import { useState } from "react";
import { useSelector } from "react-redux";

export default function ({ listing, currentHighestBid }) {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [formBid, setFormBid] = useState({
    bidingPrice: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "number") {
      setFormBid({
        ...formBid,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formBid.bidingPrice <= listing.reservedPrice) {
      setError("Your bid must be higher than the starting price.");
      return;
    } else if (formBid.bidingPrice <= currentHighestBid) {
      setError("Your bid must be higher than the current highest bid.");
      return;
    }

    setError(false);
    try {
      const res = await fetch("/api/biding/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formBid,
          userRef: currentUser._id,
          itemRef: listing._id,
        }),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      } else {
        setFormBid({ bidingPrice: "" });
        setError(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="number"
          id="bidingPrice"
          placeholder="Entre your price"
          required
          className="p-3 border border-gray-300 rounded-lg"
          onChange={handleChange}
          value={formBid.bidingPrice}
        />
        <button className="bg-green-700 text-white rounded-lg hover:opacity-65 p-3 w-14">
          Bid
        </button>
      </form>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
