import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Ahorra tiempo, ahorra dinero!</h1>
      <span className="mailDesc">Registrate y te enviamos las mejores ofertas</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Tu Correo Electrónico" />
        <button>Suscribirse</button>
      </div>
    </div>
  )
}

export default MailList