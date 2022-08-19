import express from "express";
import { routerIndex } from "./routers/router.index.js";

const app = express();
const port = process.env.PORT || 443;

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.use("/data", express.static("./data"));
app.use("/images", express.static("./images"));
app.use("/", routerIndex);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
