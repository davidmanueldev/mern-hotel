import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?destacado=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
        "Cargando"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.fotos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.nombre}</span>
              <span className="fpCity">{item.ciudad}</span>
              <span className="fpPrice">
                Desde Bs.{item.precioMasBajo}
              </span>
              {item.calificacion && (
                <div className="fpRating">
                  <button>{item.calificacion}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
