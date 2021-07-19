require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const anonymUserKey = process.env.AWS_ANONYM_USER;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

async function uploadToS3(file, userId){
    const fileStream = fs.createReadStream(file);

    const uploadingParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: userId.toString()
    };

    return s3.upload(uploadingParams).promise();
};

function getFileFromS3(fileKey){
    const downloadingParams = {
        Bucket: bucketName,
        Key: fileKey || anonymUserKey
    };

    return s3.getObject(downloadingParams).createReadStream();
};


module.exports = {uploadToS3, getFileFromS3}