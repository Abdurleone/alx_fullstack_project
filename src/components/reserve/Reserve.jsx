import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch.js";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [numNights, setNumNights] = useState(1);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  // Helper function to get all dates within a range
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = dates?.[0]?.startDate && dates?.[0]?.endDate
    ? getDatesInRange(dates[0].startDate, dates[0].endDate)
    : [];

  const isAvailable = (roomNumber) => {
    return !roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          return axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
        })
      );
      setBookingConfirmed(true);
    } catch (err) {
      console.error("Reservation error:", err.response ? err.response.data : err.message);
      alert("Failed to reserve rooms. Please try again.");
    }
  };

  const totalPrice = selectedRooms.reduce((total, roomId) => {
    const room = data.find((item) =>
      item.roomNumbers.some((room) => room._id === roomId)
    );
    return total + (room ? room.price * numNights : 0);
  }, 0);

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        {bookingConfirmed ? (
          <div className="confirmationMessage">
            <h2>Booking Confirmed!</h2>
            <p>Your reservation has been successfully completed.</p>
            <button onClick={() => navigate("/")}>Go to Home</button>
          </div>
        ) : (
          <>
            <h2>Select your rooms:</h2>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error">Error: {error}</p>
            ) : (
              data.map((item) => (
                <div className="rItem" key={item._id}>
                  <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">
                      Max people: <b>{item.maxPeople}</b>
                    </div>
                    <div className="rPrice">${item.price} per night</div>
                  </div>
                  <div className="rSelectRooms">
                    {item.roomNumbers.map((roomNumber) => (
                      <div className="room" key={roomNumber._id}>
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={handleSelect}
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <div className="numNightsInput">
              <label>Number of Nights:</label>
              <input
                type="number"
                min="1"
                value={numNights}
                onChange={(e) => setNumNights(Number(e.target.value))}
              />
            </div>

            <div className="summary">
              <h3>Selected Rooms: {selectedRooms.length}</h3>
              <h4>Total Price: Ksh{totalPrice}</h4>
            </div>

            <button
              onClick={handleClick}
              className="rButton"
              disabled={selectedRooms.length === 0}
            >
              Reserve Now!
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Reserve;