import express from 'express';
import { errorHandler } from './middleware/ErrorHandler';
import routers from './component/router';
import CommonConfig from './config/CommonConfig';
import { corsMiddleware } from './middleware/Cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { commonResponse } from './util/ResponseForm';

const maxSize = 2 * 1024 * 1024;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media')
  },
  filename: function (req, file, cb) {
    cb(null, (Date.now() + '-' + file.originalname))
  }
})

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
})

const expressApp = express();

var loggerStream = fs.createWriteStream(path.join(__dirname, '../system.log'), { flags: 'a' })

expressApp.use(morgan('combined', { stream: loggerStream }))
expressApp.use(morgan('dev'))

expressApp.use(corsMiddleware);

expressApp.use(bodyParser.json({
  limit: '50mb'
}));
expressApp.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));

for (const router of routers) {
  expressApp.use(router.path, router.router)
}

expressApp.post('/upload/photo', upload.single('image'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(commonResponse({
    imagePath: file.path
  }))
})

expressApp.use(errorHandler)

expressApp.use('/media', express.static('media'))

expressApp.listen(CommonConfig.PORT, () => {
  console.log('Server is running at port', CommonConfig.PORT)
});
