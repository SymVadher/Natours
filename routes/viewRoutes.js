const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const router = express.Router();
router.get("/", authController.isLoggedIn, viewController.getOverview);
router.get("/signup", authController.isLoggedIn, viewController.signup);
router.get("/login", authController.isLoggedIn, viewController.login);
router.get("/tour/:slug", authController.isLoggedIn, viewController.getTour);
router.get("/me", authController.protect, viewController.getProfile);

router.get(
  "/my-tours",
  bookingController.createBookingCheckout,
  authController.protect,
  viewController.getMyTours
);

router.post(
  "/submit-user-data",
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
