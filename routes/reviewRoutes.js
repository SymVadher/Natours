const express = require("express");
const reviewController = require("../controllers/reviewController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/:id")
  .get(reviewController.getOneReview)
  .delete(
    authController.restrictedTo("admin", "user"),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictedTo("admin", "user"),
    reviewController.updateReview
  );

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(authController.restrictedTo("user"), reviewController.createReview);

module.exports = router;
