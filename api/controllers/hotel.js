import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("El hotel ha sido eliminado...");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...otros } = req.query;
  try {
    const hotels = await Hotel.find({
      ...otros,
      precioMasBajo: { $gte: min || 1, $lte: max || 999 }, // Esto originalmente era $gt | y $lt
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
// export const getHotels = async (req, res, next) => {
//   const { min, max, limit, ...otros } = req.query;
//   try {
//     const hotels = await Hotel.find({
//       ...otros,
//       precioMasBajo: { $gt: min || 1, $lt: max || 999 },
//     }).limit(Number(limit));
//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ ciudad: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ tipo: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ tipo: "apartmento" });
    const resortCount = await Hotel.countDocuments({ tipo: "resort" });
    const villaCount = await Hotel.countDocuments({ tipo: "villa" });
    const cabinCount = await Hotel.countDocuments({ tipo: "cabaña" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartmentos", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabañas", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.habitaciones.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
