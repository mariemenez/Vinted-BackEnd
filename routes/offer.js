const express = require("express");
const router = express.Router();

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const Offer = require("../models/Offer");
const User = require("../models/User");

const isAuthenticated = require("../middlewares/isAuthenticated");

// FONCTION POUR CONVERTIR BUFFER EN BASE64
const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

// ROUTE POUR POSTER UNE ANNONCE
router.post(
  "/offer/publish",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      const pictureConverted = convertToBase64(req.files.picture);
      const result = await cloudinary.uploader.upload(pictureConverted, {
        folder: `//vinted/offers/${req.user._id}`,
      });
      // console.log(result);
      const newOffer = new Offer({
        product_name: req.body.name,
        product_description: req.body.description,
        product_price: req.body.price,
        product_details: [
          {
            condition: req.body.condition,
            city: req.body.city,
            brand: req.body.brand,
            size: req.body.size,
            color: req.body.color,
          },
        ],
        product_image: { picture: result.secure_url },
        owner: req.user,
      });
      newOffer.save();
      res.json(newOffer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// ROUTE POUR SUPPRIMER UNE ANNONCE
router.delete("/offer/delete", isAuthenticated, async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.body.id);
    res.json({ message: "Cette offre a bien été supprimée" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ROUTE POUR MODIFER UNE ANNONCE
router.put("/offer/update", isAuthenticated, fileUpload(), async (req, res) => {
  try {
    const offerToModify = await Offer.findById(req.body.id);
    // console.log(offerToModify);

    if (req.body.name) {
      offerToModify.product_name = req.body.name;
    }
    if (req.body.description) {
      offerToModify.product_description = req.body.description;
    }
    if (req.body.price) {
      offerToModify.product_price = req.body.price;
    }
    if (req.body.condition) {
      offerToModify.product_details[0].condition = req.body.condition;
    }
    if (req.body.city) {
      offerToModify.product_details[0].city = req.body.city;
    }
    if (req.body.brand) {
      offerToModify.product_details[0].brand = req.body.brand;
    }
    if (req.body.size) {
      offerToModify.product_details[0].size = req.body.size;
    }
    if (req.body.color) {
      offerToModify.product_details[0].color = req.body.color;
    }
    if (req.files) {
      const pictureConverted = convertToBase64(req.files.picture);
      const result = await cloudinary.uploader.upload(pictureConverted, {
        folder: `//vinted/offers/${req.user._id}`,
      });
      offerToModify.product_image.picture = result.secure_url;
    }
    offerToModify.markModified("product_details");
    await offerToModify.save();
    res.json(offerToModify);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ROUTE POUR FILTER DES ANNONCES
router.get("/offers", async (req, res) => {
  try {
    let filters = {};

    const name = new RegExp(req.query.name, "i");
    if (name) {
      filters.product_name = name;
    }

    const priceMin = req.query.priceMin;
    const priceMax = req.query.priceMax;
    if (priceMin) {
      filters.product_price = { $gte: priceMin };
    }
    if (priceMax) {
      if (!filters.product_price) {
        filters.product_price = { $lte: priceMax };
      } else {
        filters.product_price.$lte = priceMax;
      }
    }

    const sortFilter = {};
    const sort = req.query.sort;
    if (sort === "price-asc") {
      sortFilter.product_price = "asc";
    } else if (sort === "price-desc") {
      sortFilter.product_price = "desc";
    }

    const page = req.query.page;
    const limit = 5;
    let pageRequired = 1;
    if (page) {
      pageRequired = page;
    }
    const skip = (pageRequired - 1) * limit;

    const result = await Offer.find(filters)
      .sort(sortFilter)
      .skip(skip)
      .limit(limit)
      .populate("owner", "account _id");
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ROUTE POUR RECUPERER LES DETAILS D'UNE ANNONCE AVEC SON ID
router.get("/offer/:id", async (req, res) => {
  try {
    const OfferId = await Offer.findById(req.params.id).populate(
      "owner",
      "account _id"
    );
    res.json(OfferId);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
