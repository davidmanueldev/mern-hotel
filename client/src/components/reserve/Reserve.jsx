import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";

import React, { useContext, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);

  const { dates } = useContext(SearchContext);

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

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.fechasNoDisponibles.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            fechas: allDates,
          });
          return res.data;
        })
      );
      navigate("/");
      setOpen(false);
    } catch (err) {}
  };

  return (
    // <div className="reserve">
    //   <div className="rContainer">
    //     <FontAwesomeIcon
    //       icon={faCircleXmark}
    //       className="rClose"
    //       onClick={() => setOpen(false)}
    //     />
    //     <span>Elige tus habitaciones:</span>
    //     {data.map((item) => (
    //       <div className="rItem">
    //         <div className="rItemInfo">
    //           <div className="rTitle">{item.titulo}</div>
    //           <div className="rDesc">{item.desc}</div>
    //           <div className="rMax">
    //             Max Personas:<b>{item.maxPersonas}</b>
    //           </div>
    //           <div className="rPrice">{item.precio}</div>
    //         </div>
    //         <div className="room">
    //           {item.numerosHabitacion.map((roomNumber) => (
    //             <>
    //               <label>{roomNumber.numero}</label>
    //               <input
    //                 type="checkbox"
    //                 value={roomNumber._id}
    //                 onChange={handleSelect}
    //                 disabled={!isAvailable(roomNumber)}
    //               />
    //             </>
    //           ))}
    //           <button onClick={handleClick} className="rButton">
    //             Reserve Ahora ga
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.titulo}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Cantidad Máxima de Personas: <b>{item.maxPersonas}</b>
              </div>
              <div className="rPrice">{item.precio}</div>
            </div>
            <div className="rSelectRooms">
              {item.numerosHabitacion.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.numero}</label>
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
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Ahora!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
