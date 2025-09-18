import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { files: 1, fileSize: 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Invalid format please provide (png, jpg or jpeg)"));
    }
    cb(null, true);
  },
});

const uploadSingleAvatar = (req, res, next) => {
  upload.single("avatar")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      let message = "File upload error.";
      if (err.code === "LIMIT_FILE_SIZE") {
        message = "File size must be less than 1MB!";
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = err.message || "Only image files are allowed!";
      }
      return res.status(400).json({ resStatus: false, error: message });
    } else if (err) {
      return res.status(400).json({ resStatus: false, error: err.message });
    }
    next();
  });
};

export default uploadSingleAvatar;
