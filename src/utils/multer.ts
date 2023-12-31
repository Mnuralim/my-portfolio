import multer, { type Multer } from 'multer'

const multerFiltering = (req: Request, file: any, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload: Multer = multer({
  // @ts-ignore
  fileFilter: multerFiltering,
  limits: {
    fileSize: 5000000,
  },
})

export default upload
