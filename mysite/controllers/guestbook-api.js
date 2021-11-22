const models = require('../models');
const { Op } = require('sequelize');

module.exports = {
    create: async function(req, res, next) {
        try{
            const result = await models.Guestbook.create(req.body);
            res.send({
                result: 'success',
                data: result,
                message: null
            });
        } catch(e) {
            next(e);
        }
    },
    read: async function(req, res, next) {
        try{
            console.log("여기는 read")
             const startNo = req.query.sno || 0;
             const results = await models.Guestbook.findAll({
                attributes: ['no', 'name', 'message'],
                where: (startNo > 0) ? { no: { [Op.lt]: startNo }} : {},
                order: [
                    ['no', 'desc']
                ],
                limit: 3
             });


             res.send({
                result: 'success',
                message: null,
                data: results
             });
        } catch(e) {
            next(e);
        }
    },
    delete: async function(req, res, next) {
        try{
            await models.Guestbook.deatroy({
                where: {
                    [Op.and]: [{no: req.params.no}, {password: req.body.password}]
                }
            });

            res.send({
                result: 'success',
                message: null,
                data: req.params.no

            })
        } catch(e) {
            next(e);
        }
    }
}