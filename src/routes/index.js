const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("node:path");
const controller = require("../controllers/controller");

// multer configuration for uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// multer configuration for uploading images only jpg, jpeg and png
const fileFilter  = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null,true)
  }else{
    cb(new Error('Only jpg, jpeg and png are allowed'),false)
  }
}

// final multer configuration for uploading images
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 500,
  },
});

router.get("/", controller.homepage);

router.get('/search',controller.searchuser)

router.post("/adduser", upload.single("file"), controller.adduser);

router.delete("/deleteuser", controller.deleteuser);

router.patch("/edituser", upload.single('file'),controller.edituser);

module.exports = router;
