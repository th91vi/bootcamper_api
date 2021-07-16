const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  let queryStr = JSON.stringify(req.query);

  // Regex for Mongo DB reserved params
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Bootcamp.find(JSON.parse(queryStr));

  const bootcamps = await query;

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: `Deleted bootcamp (was #${req.params.id})`,
  });
});

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const local = await geocoder.geocode(zipcode);
  const lat = local[0].latitude;
  const lng = local[0].longitude;

  // Calc radius using radians
  // Divide dis by radius of the earth
  // Earth radius = 3,963mi
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });

  if (bootcamps.length === 0) {
    return next(
      new ErrorResponse(
        `No bootcamp found within given radius (${radius})`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
