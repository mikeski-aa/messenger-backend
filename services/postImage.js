const cloudinary = require("cloudinary").v2;

async function postImage(imagePath) {
  // config setup required here to connect
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);

    return { result, success: true };
  } catch (error) {
    console.log(error);
    return { error: error, success: false };
    return;
  }
}

module.exports = { postImage };
