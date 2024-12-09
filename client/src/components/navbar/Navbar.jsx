import { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link
          to="/"
          style={{ color: "inherit", textDecoration: "none", padding: "1rem" }}
        >
          <span className="logo">Hoteles Pepe's</span>
        </Link>
        {user ? user.nombreDeUsuario : (
          <div className="navItems">
            <button className="navButton">Registrarse</button>
            <button className="navButton">Iniciar Sesión</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
