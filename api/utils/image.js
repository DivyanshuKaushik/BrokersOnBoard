const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const generateId = () => {
    let date = new Date().toLocaleDateString().split("/").reverse().join("");
    let time = new Date().toTimeString().split(" ")[0].split(":").join("");
    return date.concat(time);
};

async function uploadImageToDisk(image,folder="property") {
    return new Promise(async (resolve, reject) => {
        try {
            const destination = path.join(__dirname, "../uploads/"+folder+"/");
            const name =
                image.originalname.split(".")[0] + "-" + generateId() + ".webp";
            await sharp(image.buffer)
                .webp()
                .toFile(destination + name);
            return resolve(`uploads/${folder}/` + name);
        } catch (error) {
            console.log(error);
            return reject(error);
        }
    });
}
async function deleteImageFromDisk(image) {
    return new Promise(async (resolve, reject) => {
        try {
            fs.unlinkSync(image);
            return resolve(true);
        } catch (error) {
            console.log(error);
            return reject(error);
        }
    });
}

module.exports = { uploadImageToDisk,deleteImageFromDisk };
