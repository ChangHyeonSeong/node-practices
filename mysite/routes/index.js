
const errorRoute = require('./error');

//  request router
const applicationRouter = {
    setup: function(application){

            //const site = models.site.findOne();

            application.all('*', function(req, res, next){
                // req, res 전역으로 만들기 위함??
                res.locals.req = req;
                res.locals.res = res;
                next();
            })
            
            .use('/', require('./main'))
            .use('/user', require('./user'))
            .use('/guestbook', require('./guestbook'))
            .use('/api/guestbook', require('./guestbook-api'))
            .use('/gallery', require('./gallery'))
            

            .use(errorRoute.error404)
            .use(errorRoute.error500)
            

            .siteTitle = 'BoltSite';

   }
}

                 //es6 지원문법 applicationRouter : applicationRouter 과 동일
module.exports = { applicationRouter }



//예시
const i = 10;
const name = '둘리';

o = { 
    i, 
    name,
    f() { //생성자함수 사용 불가 proto chain 불가
        
    }

}