import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    if (file.size > 1024 * 1024) {
      return cb(new Error("File size must be less than 1MB!"));
    }
    cb(null, true);
  },
});

export default upload;
