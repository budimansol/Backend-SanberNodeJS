import express from "express";
import cloudinary from "./utils/cloudinary";
import { single, multiple } from "./middlewares/upload.middleware";

const router = express.Router();

router.get('/cek', (req, res) => {
  res.json('Hello World');
});

router.post("/upload/single", single, async (req, res) => {
  try {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'uploads' },
      (error, result) => {
          if (error) {
              return res.status(500).json({ message: 'Upload failed', error: error.message });
          }
          res.status(200).json({ message: 'File uploaded successfully', file: result });
      }
  );
  result.end(req.file.buffer);
} catch (error) {
    res.status(500).json({ message: "An error occurred", error: `${error}.message` });
}
});

router.post('/upload/multiple', multiple, async (req, res) => {
  try {
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
          return res.status(400).json({ message: 'No files uploaded' });
      }

      const filesArray = req.files as Express.Multer.File[];

      const uploadPromises = filesArray.map(file =>
          new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                  { folder: 'uploads' },
                  (error, result) => {
                      if (error) {
                          reject(error);
                      } else {
                          resolve(result);
                      }
                  }
              );

              uploadStream.end(file.buffer);
          })
      );

      const results = await Promise.all(uploadPromises);
      res.status(200).json({ message: 'Files uploaded successfully', files: results });
  } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: `${error}.message` });
  }
});

export default router;
