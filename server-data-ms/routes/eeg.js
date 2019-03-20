const express = require('express');
const router = express.Router();
// const { Readable } = require('stream');
// const mongodb = require('mongodb');

// TODO: Error handling

/**
 * Get eeg data
 */
router.get('/', function (req, res, next) {

    // res.set('accept-ranges', 'bytes');

    const db = req.app.locals.database;
    res.set('Content-Type', 'application/octet-stream');

    console.log('eeg route')

    // let bucket = new mongodb.GridFSBucket(db, {
    //     bucketName: 'eeg'
    // });

    const collection = db.collection('eeg.files');
    const collectionChunks = db.collection('eeg.chunks');

    collection.find("").toArray(function (err, docs) {
        if (err) {
            return res.render('index', {
                title: 'File error',
                message: 'Error finding file',
                error: err.errMsg
            });
        }
        if (!docs || docs.length === 0) {
            return res.render('index', {
                title: 'Download Error',
                message: 'No file found'
            });
        } else {
            // TODO: date ...??
            // console.log(docs)
            const last_file = docs[docs.length - 1];
            console.log(last_file);
            collectionChunks.find({ files_id: last_file._id })
                .sort().toArray(function (err, chunks) {
                    if (err) {
                        return res.render('index', {
                            title: 'Download Error',
                            message: 'Error retrieving chunks',
                            error: err.errmsg
                        });
                    }
                    if (!chunks || chunks.length === 0) {
                        //No data found            
                        return res.render('index', {
                            title: 'Download Error',
                            message: 'No data found'
                        });
                    }

                    let fileData = [];
                    var base64data = '';
                    console.log('chunks.length ', chunks.length)
                    for (let i = 0; i < chunks.length; i++) {
                        // console.log(chunks[i].data.buffer)
                        // console.log('random byte string:', chunks[i].data.toString("base64"));
                        fileData.push(chunks[i].data.toString('base64'));
                        base64data += Buffer.from(chunks[i].data.buffer).toString('utf8');
                    }

                    const base64String = fileData.join('');
                    // const output = Buffer.from(base64String, 'base64');
                    console.log(base64String)
                    // console.log('base64data', base64data)

                    //Display the chunks using the data URI format          
                    // let finalFile = 'data:' + docs[0].contentType + ';base64,'
                    //     + fileData.join('');
                    // console.log(finalFile)
                    // res.render('index', {
                    //     message: 'Image loaded from MongoDB GridFS'
                    // });
                    res.send(base64data)
                });
        }
    });


    // downloadStream.on('data', (chunk) => {
    //     console.log(chunk.data.toString('base64'))
    //     res.write(chunk.data.toString('base64'));
    // });

    // downloadStream.on('error', () => {
    //     res.sendStatus(404);
    // });

    // downloadStream.on('end', () => {
    //     res.end();
    // });
});

module.exports = router;
