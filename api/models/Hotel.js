import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  distancia: {
    type: Number,
    required: true,
  },
  fotos: {
    type: [String],
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  calificacion: {
    type: Number,
    minimum: 0,
    maximum: 5,
  },
  habitaciones: {
    type: [String],
  },
  precioMasBajo: {
    type: Number,
    required: true,
  },
  destacado: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema, "hoteles");
