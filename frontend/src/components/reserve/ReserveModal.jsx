import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserveModal.css";

const ReserveModal = ({setOpen, hotelId}) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const {data, loading, error} = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
  const {dates} = useContext(SearchContext);

  const getDatesInRange = (startDate,endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];

    while(data <= end) {
      list.push(new Date(date));
      date.setDate(date.getDate()+1);
    }
    return list;
  }
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date => {
      allDates.includes(new Date(date).getTime());
    })
    return !isFound;
  }
  
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked 
      ? [...selectedRooms, value]
      : selectedRooms.filter((item) => item !== value)
    )
  }

  const handleClick = async() => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
    } catch (err) {
      
    }
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)}/>
      </div>
      <span>Select your rooms:</span> 
      {data.map(item => (
        <div className="rItem">
          <div className="rItemInfo">
            <div className="rTitle">{item.title}</div>
            <div className="rDesc">{item.description}</div>
            <div className="Max">
              Max people: <b>{item.maxPeople}</b>
            </div>
            <div className="rPrice">
              {item.price}
            </div>
            <div className="room">
              {item.roomNumbers.map(roomNumber => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disable={!isAvailable(roomNumber)}/>
                </div>
              ))}
              <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReserveModal;