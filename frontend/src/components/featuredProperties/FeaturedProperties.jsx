import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const {data, loading, error} = useFetch(`${process.env.REACT_APP_API_URL}/hotels?featured=true&limit=4`);
  const navigate = useNavigate();

  const handleClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`)
  }
  return (
    <div className="fp">
      {loading ? "Loading" : 
        <>
          {data.map((item) => (
            <div onClick={() => handleClick(item._id)} className="fpItem" key={item._id}>
              <img
                src={item?.photos[0]}
                alt="Image not found"
                className="fpImg"
              />
              <span className="fpName">{item?.name}</span>
              <span className="fpCity">{item?.city}</span>
              <span className="fpPrice">Starting from ${item?.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      }
    </div>
  );
};

export default FeaturedProperties;
