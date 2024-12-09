import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.fotos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.nombre}</h1>
        <span className="siDistance">{item.distancia}m desde la Ceja</span>
        <span className="siTaxiOp">Taxi gratuito al aeropuerto</span>
        <span className="siSubtitle">Apartamento con aire acondicionado</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Cancelación Gratuita </span>
        <span className="siCancelOpSubtitle">
          Puede cancelarlo más tarde, así que asegúrese hoy mismo este magnífico
          precio.
        </span>
      </div>
      <div className="siDetails">
        {item.calificacion && (
          <div className="siRating">
            <span>Excelente</span>
            <button>{item.calificacion}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">Bs.{item.precioMasBajo}</span>
          <span className="siTaxOp">Impuestos incluidos</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">Ver disponibilidad</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
