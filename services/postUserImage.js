const cloudinary = require("cloudinary").v2;

async function uploadImage(imagePath) {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { uploadImage };
