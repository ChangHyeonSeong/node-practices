
const model = require('../models/guestbook');

module.exports = {
    index: async function(req, res) {
        const results = await model.findAll();
        res.render('index', {
            list: results || []
        });
    },
    add: async function(req, res) {
        const results = await model.insert(req.body);
        res.redirect("/");
    },
    deleteform: function(req, res) {
        const data = {
            no: req.query.no || ''
        };
        res.render('deleteform', data);
    },
    delete: async function(req, res) {
        const results = await model.delete(req.body);
        res.redirect("/");
    }
}


