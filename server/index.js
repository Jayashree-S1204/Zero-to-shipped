import express from "express";
import routes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api", routes);

// Last-resort error handler - everything specific is handled in routes.js.
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ success: false, error: "Server error." });
});

app.listen(PORT, () => {
  console.log(`Resume server listening on http://localhost:${PORT}`);
});
