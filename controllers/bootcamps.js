const Bootcamp = require("../models/Bootcamp");

exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: "Show all bootcamps" });
};

exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Display bootcamp #${req.params.id}` });
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

exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Updated bootcamp #${req.params.id}` });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Deleted bootcamp (was #${req.params.id})`,
  });
};
