const express = require('express');
const multer = require('multer');
const fs = require('fs');
const gm = require('gm');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');
const { logger } = require("../config/logConfig");

const Talk = require('../schemas/talk');

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'uploads/'+req.query.uuid+'/';

        if (!fs.existsSync(path))
            fs.mkdirSync(path);

        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
  }),
});

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

router.get('/', async (req, res, next) => {
    logger.info('get /Talk/ ' + JSON.stringify(req.query));
    const lang = req.query.lang;
    const mode = parseInt(req.query.mode) || 0;
    const tag = parseInt(req.query.tag) || -1;
    const skip =  parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const title = req.query.title;
    
    const query = { lang: lang };
    if (tag !== -1) {
        query['tag'] = tag;
    }
    if (title && title !== '') {
        query['title'] = title;
    }
    
    const sort = { createDate: -1 };
    if (mode === 0) { // 1주일내에 추천수가 많은거
        let bef7 = new Date();
        bef7 = bef7.setDate(bef7.getDate() - 7);

        query['createDate'] = { $gte: bef7 };
        sort['like_count'] = -1;
    } else if (mode === 2) {
        sort['like_count'] = tag;
    }

    const project = {
        title: 1,
        tag: 1,
        preview: 1,
        'user.name': 1,
        'user.ip': 1,
        createDate: 1,
        like_count: {
            $size: '$like'
        },
        comment_count: {
            $size: '$comment'
        }
    }

    const talks = await Talk.find(query, project, { skip: skip, limit: limit, sort: { createDate: -1 } });
    const total = await Talk.count(query);
    const response = { code:200, message:"succes ", talks:talks, total:total };
    res.json(response);
});

router.post('/', async (req, res, next) => {
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
    logger.info(req.headers['x-forwarded-for']);
    logger.info((req.headers['x-forwarded-for'] || '').split(',')[0]);
    logger.info(req.connection.remoteAddress);

    const talk = req.body;
    talk['user']['ip'] = ip;

    let preview = talk['detail'].match(/<(\/img|img)([^>]*)>/);
    if (preview) {
        preview = preview[0].replace('<img src="', '');
        preview = preview.replace('">', '');
        talk['preview'] = preview;
    }

    logger.info('post /Talk (' + talk.tag + ') ' + talk.title + ' - ' + JSON.stringify(talk['user']));

    await new Talk(talk).save();

    const response = { code:200, message:"succes " };
    res.json(response);
});
router.delete('/cancel', async (req, res, next) => {
    logger.info('delete /Talk/cancel ' + JSON.stringify(req.params) + ' ' + JSON.stringify(req.query));

    const path = 'uploads/'+req.query.uuid;
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
    
        fs.rmdirSync(path);
    }

    const response = { code:200, message:"succes " };
    res.json(response);
});
router.get('/:id', async (req, res, next) => {
    logger.info('get /Talk/:id ' + JSON.stringify(req.params) + ' ' + JSON.stringify(req.query));
    const id = req.params.id;
    const _id = new mongoose.Types.ObjectId(id);

    const talk = await Talk.findOne({ _id: _id });

    const response = { code:200, message:"succes ", talk:talk };
    res.json(response);
});
router.put('/:id', async (req, res, next) => {
    logger.info('put /Talk/:id ' + JSON.stringify(req.params) + ' ' + JSON.stringify(req.query));
    
    const response = { code:200, message:"succes " };
    res.json(response);
});
router.delete('/:id', async (req, res, next) => {
    logger.info('delete /Talk/:id ' + JSON.stringify(req.params) + ' ' + JSON.stringify(req.query));

    const response = { code:200, message:"succes " };
    res.json(response);
});

router.post('/image', upload.single('upload'), (req, res, next) => {
    const path = req.file.destination+req.file.filename;

    // gm(path)
    //     //.noProfile()
    //     .resizeExact(500)
    //     .write(path, function (err) {
    //         if (err) console.error(err)
    //         else console.log('done')
    //     });
    gm(path)
        //.noProfile()
        .thumb(100, 100, path, function (err) {
            if (err) console.error(err)
            else console.log('done')
        });

    const response = {
        uploaded: true, 
        url: 'http://localhost:3000/'+path
    };
    res.json(response);
});

module.exports = router;