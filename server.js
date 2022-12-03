import express from "express";
import { join } from "path";
const app = express();

app.use(express.static(join(__dirname, "build")));

app.get("/*", function (_, res) {
  res.sendFile(join(__dirname, "build", "index.html"));
});

app.listen(3000);
console.log("Server is listening on port 3000");
