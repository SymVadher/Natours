const express = require("express");
const tourController = require("../controllers/tourController");
const reviewRouter = require("../routes/reviewRoutes");
const authController = require("../controllers/authController");

const router = express.Router();

router.use("/:tourId/reviews", reviewRouter);
router.route("/tours-stats").get(tourController.tourStats);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictedTo("admin", "lead-guide"),
    tourController.addTour
  );
router
  .route("/:id")
  .get(tourController.getOneTour)
  .patch(
    authController.protect,
    authController.restrictedTo("admin", "lead-guide"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictedTo("admin", "lead-guide"),
    tourController.deleteTour
  );

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getToursWithin);

module.exports = router;
