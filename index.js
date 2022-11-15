const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;

const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

const Offer = require("./models/Offer");

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
  const price = req.body.newPrice;
  const description = req.body.description;
  const id = req.body.id.id;

  const response = await stripe.charges.create({
    amount: price,
    currency: "eur",
    description: description,
    source: stripeToken,
  });
  console.log(id);
  await Offer.findByIdAndDelete(id);
  res.json(response);
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
