const fs = require('fs');
var AWS = require('aws-sdk');
AWS.config={ 
	"accessKeyId": 'AKIA5GBT3CCPAGWGB4SV', 
	"secretAccessKey": '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', 
    "region": 'us-east-2',
    

};
const s3 = new AWS.S3({region: 'ap-south-1'})

const upload  = (file,path) => {
    return new Promise((resolve,reject)=>{
        var tmp_path = file.path;        
        image = fs.createReadStream(tmp_path);
        imageName =  path+new Date().getTime()+"-"+file.name.split(' ').join('_');
        const params = { 
            Bucket: 'realestateandmore4-dev', 
            Key: imageName, 
            ACL: 'public-read',
            Body:image
        };
        s3.putObject(params, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let url = "https://s3.us-east-2.amazonaws.com/realestateandmore4-dev/"+imageName;
                resolve(url);
            }
        })
    })
}

module.exports ={
    upload
}