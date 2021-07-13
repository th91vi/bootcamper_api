const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404);
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: "Bootcamp update fail",
      });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        message: "Bootcamp delete fail",
      });
    }

    res.status(200).json({
      success: true,
      message: `Deleted bootcamp (was #${req.params.id})`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
