import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import MBTiles from "@mapbox/mbtiles";

// Enable CORS and set correct mime type/content encoding
const app = express();
app.use(cors());

const appHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type": "application/x-protobuf",
};

const mbtilesPath = path.join(
  __dirname,
  "public",
  "zurich_switzerland.mbtiles"
);

// Route to serve MBTiles style JSON
app.get("/styles/basic-preview/style.json", (req: Request, res: Response) => {
  const stylesPath = path.join(__dirname, "public", "style.json");
  fs.readFile(stylesPath, (err, data) => {
    if (err) {
      console.error("Error reading styles JSON file:", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

app.get("/data/v3.json", (req: Request, res: Response) => {
  const v3Path = path.join(__dirname, "public", "v3.json");
  fs.readFile(v3Path, (err, data) => {
    if (err) {
      console.error("Error reading v3 JSON file:", err);
      res.status(500).send("Internal server error");
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

app.get("/data/v3/:z/:x/:y.pbf", (req: Request, res: Response) => {
  new MBTiles(mbtilesPath, (err: any, mbtiles: any) => {
    if (err) {
      console.error("Error opening database:", err);
      res.status(500).send("Internal server error");
      return;
    }
    mbtiles.getTile(
      Number(req.params.z),
      Number(req.params.x),
      Number(req.params.y),
      (err: any, tile: any) => {
        if (err) {
          res.set({ "Content-Type": "text/plain" });
          res.status(404).send("Tile rendering error: " + err + "\n");
        } else {
          res.set(appHeaders);
          res.send(tile);
        }
      }
    );
  });
});

app.get("/fonts/:font/:range.pbf", (req: Request, res: Response) => {
  const range = req.params.range;
  const fontPath = path.join(__dirname, "public", "fonts", `${range}.pbf`);

  fs.readFile(fontPath, (err, data) => {
    if (err) {
      console.error("Error reading font file:", err);
      res.status(404).send("Font file not found: " + err + "\n");
      return;
    }

    // Check if the file is gzipped by inspecting the first few bytes of the file
    if (data[0] === 0x1f && data[1] === 0x8b) {
      // File is gzipped
      res.set({ ...appHeaders, "Content-Encoding": "gzip" });
      res.send(data);
    } else {
      // File is not gzipped
      res.set(appHeaders);
      res.send(data);
    }
  });
});

// Start the server on port 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
