const Router = require('express').Router;
const router = Router();

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const fs = require('fs');

const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'testspacejesus',
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: file.fieldname
            })
        },
        key: (request, file, cb) => {
            console.log(file);
            cb(null, file.originalname)
        }
    })
}).array('upload', 1);

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.send('error!');
        }
        console.log('File succssefully uploaded');
        // res.send('Uploaded!');
        res.redirect('files');
    })
});

router.get('/files', (req, res) => {
    s3.listObjects({
        Bucket: 'testspacejesus'
    }, (err, data) => {
        console.log(data)
        res.render('files', {
            Contents: data.Contents
        });
    })
})

router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;

    s3.getObject({
        Bucket: 'testspacejesus',
        Key: filename
    }, (err, data) => {
        if (err) console.log(err, err.stack);
        else {
            console.log(data)
            const file = fs.createWriteStream(`./src/public/files/${filename}`);
            file.write(data.Body)
            res.redirect('/files/' + filename);
        }
    })
});

module.exports = router;