const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

// FONCTION POUR CONVERTIR BUFFER EN BASE64
const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

// ROUTE POUR CREER UN COMPTE
router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist !== null) {
      return res.json({ message: "Cet email est déjà associé à un compte" });
    }

    if (req.body.username === "") {
      return res.json({ message: "L'username n'est pas renseigné" });
    }

    const email = req.body.email;
    const username = req.body.username;
    const avatar = req.files;
    const password = req.body.password;
    const newsletter = req.body.newsletter;
    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);
    const token = uid2(64);

    const pictureConverted = convertToBase64(req.files.avatar);
    const result = await cloudinary.uploader.upload(pictureConverted);

    const newUser = new User({
      email: email,
      account: {
        username: username,
        avatar: result,
      },
      newsletter: newsletter,
      token: token,
      hash: hash,
      salt: salt,
    });
    await newUser.save();
    res.json({
      id: newUser._id,
      email,
      token,
      account: { username, avatar: result },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  ROUTE POUR SE CONNECTER
router.post("/user/login", async (req, res) => {
  try {
    const emailToConnect = req.body.email;
    const passwordToConnect = req.body.password;
    const foundEmail = await User.findOne({ email: req.body.email });
    const salt = foundEmail.salt;
    const hashToVerify = SHA256(salt + passwordToConnect).toString(encBase64);

    if (hashToVerify !== foundEmail.hash) {
      return res.json({ message: "mot de passe invalide" });
    }

    res.json({
      id: foundEmail._id,
      token: foundEmail.token,
      account: foundEmail.account,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
