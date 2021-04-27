exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: "Show all bootcamps" });
};

exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Display bootcamp #${req.params.id}` });
};

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, message: "Created new bootcamp" });
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
