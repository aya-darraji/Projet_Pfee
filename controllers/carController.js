const carModel = require("../models/carModel");
const userModel = require("../models/userModel");

module.exports.AddCar = async (req, res) => {
  try {
    const { brand, model, year, prix } = req.body;
    const newCar = new carModel({ brand, model, year, prix });
    const added = await newCar.save();

    res.status(200).json({ added });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCars = async (req, res) => {
  try {
    const cars = await carModel.find();
    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.UpdateCar = async (req, res) => {
  try {
    //logique mahma ken
    //.
    //.
    //logique
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.DeleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    await userModel.updateMany({}, { $pull: { cars: car._id } });


    res.status(200).json("voiture supprimee avec succes");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.affectation = async (req, res) => {
  try {
    const { idCar } = req.body;
    
    const idOwner = req.session.user_id;

    const car = await carModel.findByIdAndUpdate(
      idCar,
      { owner: idOwner },
      { new: true }
    );

    await userModel.findByIdAndUpdate(idOwner, { $push: { cars: idCar } });

    res.status(200).json("affected");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.desaffectation = async (req, res) => {
  try {
    
    const { idCar , idOwner } = req.body;

    const car = await carModel.findByIdAndUpdate(idCar, { owner: null }, { new: true });

    await userModel.findByIdAndUpdate(idOwner, { $pull: { cars: idCar } });

    res.status(200).json("desaffeted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
