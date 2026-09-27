import { extractTextFromPdf } from "./service.js";

export async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded. Send the PDF as form field 'resume'.",
      });
    }

    const { text, pages } = await extractTextFromPdf(req.file.buffer);

    if (!text) {
      return res.status(422).json({
        success: false,
        error:
          "The PDF was read but contains no extractable text. It may be a scanned image.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume received and parsed successfully.",
      data: {
        filename: req.file.originalname,
        sizeBytes: req.file.size,
        pages,
        text,
      },
    });
  } catch (err) {
    console.error("Resume upload error:", err);
    return res.status(400).json({
      success: false,
      error: "Could not process the uploaded resume.",
    });
  }
}
