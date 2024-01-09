const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppError("Required document Not Found", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
      return next(new AppError("Required document Not Found", 404));
    }
    res.status(201).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("Required document Not Found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
};

exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let query, doc;
    query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);
    doc = await query;
    if (!doc) {
      return next(new AppError("Required document Not Found", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const filter = req.params.tourId ? { tour: req.params.tourId } : {};
    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .select()
      .paginate();
    doc = await features.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        doc,
      },
    });
  });
};
