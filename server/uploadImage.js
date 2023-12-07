import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dsdgc2jsy',
  api_key: '317441937295971',
  api_secret: 'ABfmm-1Kkc8SypuJ2mDhbLwBEcY'
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: 'auto'
};

export const uploadImage = (image) => {
  // imaginea trebuie să fie în format base64 sau un URL
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

export const uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};
