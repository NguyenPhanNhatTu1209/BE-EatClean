const express = require("express");
const router = express.Router();
const userController = require("../app/Controllers/UserController");
var multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'Image', maxCount: 1 }]);

router.post("/register-user",cpUpload, userController.RegisterUser);
router.post("/register-collaborator",cpUpload, userController.RegisterCollaborator);
router.post("/login", userController.login);
router.get("/verify-email/:token", userController.verifyEmail);


module.exports = router;