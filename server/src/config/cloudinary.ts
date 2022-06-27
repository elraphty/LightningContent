import cloudinary from 'cloudinary';
import 'dotenv/config';

cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_SECRET
})

export const uploadFile = (filepath: string, callback: (err: string, url: string | undefined) => void) => {
    cloudinary.v2.uploader.upload(filepath, (err, result) => {
        if (err) {
            callback(err.message, '')
        } else {
            callback('', result?.url);
        }
    })
};