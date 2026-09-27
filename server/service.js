import { PDFParse } from "pdf-parse";

// Pulls the raw text out of a PDF held in memory.
export async function extractTextFromPdf(buffer) {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return {
      text: result.text?.trim() ?? "",
      pages: result.total ?? 0,
    };
  } finally {
    await parser.destroy();
  }
}
