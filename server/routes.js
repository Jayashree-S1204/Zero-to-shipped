import { Router } from "express";
import multer from "multer";
import { uploadResume } from "./controller.js";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// Keep the file in memory (no disk writes) - we only need its text.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    const isPdf =
      file.mimetype === "application/pdf" ||
      file.originalname.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      return cb(new Error("ONLY_PDF_ALLOWED"));
    }
    cb(null, true);
  },
});

const router = Router();

router.post("/resume/upload", upload.single("resume"), uploadResume);

// Multer and file-filter errors land here (too large, wrong type, etc.).
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      error: "File is too large. Maximum allowed size is 5 MB.",
    });
  }
  if (err?.message === "ONLY_PDF_ALLOWED") {
    return res.status(415).json({
      success: false,
      error: "Only PDF files are accepted.",
    });
  }
  next(err);
});

export default router;
