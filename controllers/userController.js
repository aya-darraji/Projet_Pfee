const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const fs = require('fs'); // Importer le module File System

//crud
//Get creation suppresion modification

module.exports.esm_focntion = async (req, res) => {
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

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().populate("cars")
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  module.exports.addUserClient = async (req, res) => {
    try {
        const { username, password , email } = req.body;
        const role = 'client'
        const user = new userModel({ username, password , email , role });
        const addedUser = await user.save();
        res.status(200).json(addedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        //const id = req.session.user._id
        const {email,username,age} = req.body;
        const updated = await userModel.findByIdAndUpdate(
            id,
            {
                $set : {username , age , email}
            }
        )
        res.status(200).json("updated");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.updatepassword = async (req, res) => {
    try {
        const {id} = req.params;
        const {password} = req.body;
 
        const salt = await bcrypt.genSalt()
        const password_hash= await bcrypt.hash(password, salt)
        
        const updated = await userModel.findByIdAndUpdate(
            id,
            {
                $set : {password : password_hash}
            }
        )

        res.status(200).json("updated");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.getSortUsersByAge = async (req, res) => {
    try {
        const users = await userModel.find().sort({age: 1})
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.getSortUsersByDate = async (req, res) => {
    try {
        const users = await userModel.find().sort({createdAt: -1})
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.searchUsersByUsername = async (req, res) => {
    try {
        const {username } = req.query ;

        const users = await userModel.find({username: { $regex : username , $options: "i"}})
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  module.exports.addUserWithImg = async (req, res) => {
    try {
        const { username, password , email , age} = req.body;
        console.log(req.body)
        const  image_user = req.file.filename
        const role = 'client'
        const user = new userModel({ username, password , email , role , image_user , age  });
        const addedUser = await user.save();
        res.status(200).json(addedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const path = require('path');
  
  module.exports.updateUserWithImg = async (req, res) => {
      try {
          const { id } = req.params;
  
          // Récupérer l'utilisateur actuel
          const user = await userModel.findById(id);
  
          const userData = { ...req.body };
  
          // Si un fichier est téléchargé, gérer l'image
          if (req.file) {
              // Sauvegarder le chemin de l'ancien fichier avant de mettre à jour
              const oldFilePath = path.join(__dirname, '..', 'public', 'files', user.image_user);
  
              // Assigner le nouveau fichier à userData
              userData.image_user = req.file.filename;
  
              // Supprimer l'ancien fichier s'il existe et s'il n'est pas une image par défaut
              if (user.image_user && user.image_user !== 'client.png') {
                  fs.unlink(oldFilePath, (err) => {
                      if (err) {
                          console.error('Error deleting previous file:', err.message);
                      } else {
                          console.log('Previous file deleted:', oldFilePath);
                      }
                  });
              }
          }
  
          // Mettre à jour les données de l'utilisateur
          const updated = await userModel.findByIdAndUpdate(
              id,
              { $set: userData },
              { new: true } // Retourner l'utilisateur mis à jour
          );
  
          res.status(200).json(updated);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };
  