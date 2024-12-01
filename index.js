import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Conectado a MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Desconectado de MongoDB");
});

mongoose.connection.on("connected", () => {
  console.log("Conectado a MongoDB");
});

app.listen(8800, () => {
  connect();
  console.log("Conectado al backend");
});
