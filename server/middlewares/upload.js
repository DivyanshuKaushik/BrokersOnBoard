const multer = require("multer");



const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: async (req, file, cb) => {
//         // await sharp(file.path).webp().toFile(file.destination + generateId() + file.originalname + ".webp");

//         cb(null, generateId() + file.originalname);
//     },
// });

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/webp" ||
        file.mimetype === "image/svg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};

const limits = {
    fileSize: 1024 * 1024 * 10,
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
