import React, { useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=3");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const closeDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id} onClick={() => handlePropertyClick(item)}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}

          {selectedProperty && (
            <div className="fpDetails">
              <h2>{selectedProperty.name}</h2>
              <p>{selectedProperty.description}</p>
              <ul>
                <li>City: {selectedProperty.city}</li>
                <li>Price: Starting from Ksh{selectedProperty.cheapestPrice}</li>
                <li>Rating: {selectedProperty.rating}</li>
              </ul>
              <button onClick={closeDetails}>Close</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;