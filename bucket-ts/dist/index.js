"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: "AKIAQUVISYWUAZYLECXL",
    secretAccessKey: "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",
    sessionToken: '',
    region: 'us-east-1'
});
// tsc 
// tsc && node ./dist/index.js
// node ./dist/index.js
const BUCKET_NAME = 'bucket-chido-uwu-uwu';
const createBucket = (bucketName) => {
    // Create the parameters for calling createBucket
    let bucketParams = {
        Bucket: bucketName
    };
    // call S3 to create the bucket
    s3.createBucket({ Bucket: bucketName, ACL: 'public-read-write' }, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", data.Location);
        }
    });
};
const listBuckets = (s3) => {
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", data.Buckets);
        }
    });
};
const uploadFile = (filePath, bucketName, keyName) => {
    var fs = require('fs');
    // Read the file
    const file = fs.readFileSync(filePath);
    // Setting up S3 upload parameters
    const uploadParams = {
        Bucket: bucketName,
        Key: keyName,
        Body: file // Local file 
    };
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        if (data) {
            console.log("Upload Success", data.Location);
        }
    });
};
const listObjectsInBucket = (bucketName) => {
    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket: bucketName,
    };
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", data);
        }
    });
};
const deleteBucket = (bucketName) => {
    // Create params for S3.deleteBucket
    var bucketParams = {
        Bucket: bucketName
    };
    // Call S3 to delete the bucket
    s3.deleteBucket({ Bucket: bucketName }, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log("Success", data);
        }
    });
};
function sleep(ms) {
    console.log('Wait...');
    return new Promise(resolve => setTimeout(resolve, ms));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\nCreating bucket : ');
        createBucket(BUCKET_NAME);
        yield sleep(5000);
        console.log('\nListing out all the buckets in your AWS S3: ');
        listBuckets(s3);
        yield sleep(5000);
        console.log('\nUploading image1 to ' + BUCKET_NAME);
        uploadFile('nodejs.jpg', BUCKET_NAME, "nodejs.jpg");
        yield sleep(5000);
        console.log('\nUploading image2 to ' + BUCKET_NAME);
        uploadFile('npm.jpg', BUCKET_NAME, "npm.jpg");
        yield sleep(5000);
        console.log('\nListing out all the files/objects in the bucket ' + BUCKET_NAME);
        listObjectsInBucket(BUCKET_NAME);
        yield sleep(5000);
    });
}
main();
