
import express from 'express'
import path from 'path'
import {merger} from "./merger.mjs"
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// console.log(__dirname)
const upload = multer({ storage: multer.memoryStorage() });


const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../frontend/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/merge", upload.array("files") , async (req,res) => {
    const buffer = await merger(req.files)

    res.setHeader('Content-Disposition', 'attachment; filename="merged.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', buffer.length);

    res.send(buffer);

});

app.listen(port, () => {
  console.log(`app listening on : http://localhost:${port}`);
});
