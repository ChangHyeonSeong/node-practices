const models = require('../models');

module.exports = {
    joinsuccess: function(req, res) {
        res.render('user/joinsuccess');
    },
    join: function(req, res) {
        res.render('user/join');
    },
    _join: async function(req, res, next) { //_join  -> post 표시
        try {
            await models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender
            });

            res.redirect('/user/joinsuccess');

        } catch(e) {
            next(e);
        }
    },
    login: function(req, res) {
        res.render('user/login');
    },
    _login: async function(req, res, next) {
        try {
            const user = await models.User.findOne({ 
              attributes: ['no', 'name', 'role'],
              where: {
                  email: req.body.email,
                  password: req.body.password
              }  
            });
            
            if(user == null) {
                res.render('user/login', Object.assign(req.body, {result: 'fail'})); //Object.assign(req.body, {})  req.body 에 {}안에 있는 속성 넣기
                return;
            }

            // 서션처리
            req.session.authUser = user;

            res.redirect('/');
        } catch(e) {
            next(e);
        }
    },
    logout: async function(req, res, next) {
        
        try {
            await req.session.destroy();
            res.redirect('/');
        } catch(e) {
            next(e);
        }
    },
    update: async function(req, res, next) {
        try {
            const user = await models.User.findOne({
                attributes: ['no', 'email', 'name', 'gender'],
                where: {
                    no: req.session.authUser.no
                }
            });
            res.render('user/update', {user})
        } catch(e) {
            next(e);
        }        
    },
    _update: async function(req, res, next) {

    }
}