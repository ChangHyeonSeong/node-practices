const fs = require('fs');
const path = require('path');
const models = require('../models');

module.exports = {
    index: async function(req,res, next){
        const results = await models.Gallery.findAll({
            attribute: ['no', 'url', 'comment'],
            other: [
                ['no', 'desc']
            ]
        })
        res.render('gallery/index', {results}); //{} es6 리터럴 확장 {results : results} 와 같다
    },
    upload: async function(req, res, next){
        try{
            const file = req.file;
            if(file){
                const contents = fs.readFileSync(file.path);

                const storeDirectory = path.join(path.dirname(require.main.filename),process.env.STATIC_RESOURCES_DIRECTORY , process.env.UPLOADIMAGE_STORE_LOCATION);
                const storePath = (path.join(storeDirectory, file.filename)) + path.extname(file.originalname);
                const url = path.join(process.env.UPLOADIMAGE_STORE_LOCATION, file.filename) + path.extname(file.originalname);

                fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
                fs.writeFileSync(storePath, contents, {flag: 'w+'});
                fs.unlinkSync(file.path);


                await models.Gallery.create({
                    url: url.replace(/\\/gi, '/'),  //윈도우환경 패스 '\'  -> '/' 로바꾸기
                    comment: req.body.comment || ''
                })
            }

            res.redirect('/gallery');
        } catch(e) {
            next(e);
        }
    }


}