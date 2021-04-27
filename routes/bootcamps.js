const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Show all bootcamps" });
});

router.get("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Display bootcamp #${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(200).json({ success: true, message: "Created new bootcamp" });
});

router.put("/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Edited bootcamp #${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Deleted bootcamp (was #${req.params.id})`,
  });
});

module.exports = router