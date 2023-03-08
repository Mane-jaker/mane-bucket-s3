import AWS from 'aws-sdk'

const s3 = new AWS.S3({
    accessKeyId: "AKIAQUVISYWUAZYLECXL",
    secretAccessKey: "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",
    sessionToken: '',
    region: 'us-east-1'
});
// tsc 
// tsc && node ./dist/index.js
// node ./dist/index.js
const BUCKET_NAME = 'bucket-chido-uwu-uwu'

const createBucket = (bucketName: any) => {
    // Create the parameters for calling createBucket
    let bucketParams = {
        Bucket : bucketName
    };
  
    // call S3 to create the bucket
    s3.createBucket({Bucket: bucketName, ACL: 'public-read-write'}, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Location);
        }
    });
}

const listBuckets = (s3: any) => {
    s3.listBuckets(function(err: any, data: any) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Buckets);
        }
    });
}

const uploadFile = (filePath: any, bucketName: any, keyName: any) => {
    var fs = require('fs');
    // Read the file
    const file = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const uploadParams = {
        Bucket: bucketName, // Bucket into which you want to upload file
        Key: keyName, // Name by which you want to save it
        Body: file // Local file 
    };

    s3.upload(uploadParams, function(err: any, data: any) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("Upload Success", data.Location);
        }
    });
};

const listObjectsInBucket = (bucketName: any) => {
    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket : bucketName,
    };
  
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

const deleteBucket = (bucketName : any) => {
    // Create params for S3.deleteBucket
    var bucketParams = {
        Bucket : bucketName
    };
  
    // Call S3 to delete the bucket
    s3.deleteBucket({Bucket: bucketName}, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

function sleep(ms: any) {
    console.log('Wait...')
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
    console.log('\nCreating bucket : ')
    createBucket(BUCKET_NAME)
    await sleep(5000)
    
    console.log('\nListing out all the buckets in your AWS S3: ')
    listBuckets(s3)
    await sleep(5000)
    
    console.log('\nUploading image1 to '+ BUCKET_NAME)
    uploadFile('nodejs.jpg',BUCKET_NAME,"nodejs.jpg")
    await sleep(5000)
    
    console.log('\nUploading image2 to '+ BUCKET_NAME)
    uploadFile('npm.jpg',BUCKET_NAME,"npm.jpg")
    await sleep(5000)
    
    console.log('\nListing out all the files/objects in the bucket '+ BUCKET_NAME)
    listObjectsInBucket(BUCKET_NAME)
    await sleep(5000)
}
main()