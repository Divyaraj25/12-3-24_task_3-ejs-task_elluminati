const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("node:path");
const mongoose = require("mongoose");
const controller = require("../controllers/controller");
const userModel = require("../models/users");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 500,
  },
});

router.get("/", controller.homepage);

router.post("/adduser", upload.single("file"), controller.adduser);

router.delete("/deleteuser", controller.deleteuser);

router.patch("/edituser", upload.single('file'),controller.edituser);

module.exports = router;
