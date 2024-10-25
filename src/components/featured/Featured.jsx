import useFetch from "../../hooks/useFetch.js";
import { Link } from "react-router-dom";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Mombasa,Nairobi,Kisumu,Kilifi"
  );

  const cities = [
    { name: "Mombasa", imgSrc: "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=", properties: data[0] },
    { name: "Nairobi", imgSrc: "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=", properties: data[1] },
    { name: "Kisumu", imgSrc: "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=", properties: data[2] },
    { name: "Kilifi", imgSrc: "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=", properties: data[0] },
  ];

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {cities.map((city, index) => (
            <Link to={`/city/${city.name.toLowerCase()}`} key={index} className="featuredItem">
              <img src={city.imgSrc} alt={city.name} className="featuredImg" />
              <div className="featuredTitles">
                <h1>{city.name}</h1>
                <h2>{city.properties} properties</h2>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Featured;
