import mongoose from "mongoose";

const HabitacionSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    maxPersonas: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    numerosHabitacion: [
      { numero: Number, fechasNoDisponibles: { type: [Date] } },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Habitacion", HabitacionSchema, "habitaciones");
