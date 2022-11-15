const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;

const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

const app = express();
app.use(cors());
app.use(express.json());
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
} catch (error) {
  console.log(error);
}
mongoose.connect(process.env.MONGODB_URI);

// IMPORT DE MES FICHIERS DE ROUTES
const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");

// JE DEMANDE A MON SERVEUR D'UTILISER MES ROUTES
app.use(userRoutes);
app.use(offerRoutes);

app.get("/", (req, res) => {
  try {
    res.json({ message: "Welcome to my project hello 🚀🚀🚀🚀🚀🚀" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// ROUTE DE PAIEMENT STRIPE
app.post("/payment", async (req, res) => {
  const stripeToken = req.body.stripeToken;

  const response = await stripe.charges.create({
    amout: 2000,
    currency: "eur",
    description: "description de l'objet acheté",
    source: stripeToken,
  });

  res.json(response);
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
