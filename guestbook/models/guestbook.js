const mysql = require('mysql2');
const dbconn = require('./dbconn');
const util = require('util');

module.exports = {
    findAll: async function(callback) {

        const conn = dbconn();

        // const query = function(sql, data) {
        //     return new Promise(function(resolve, reject){
        //         conn.query(sql, [], function(error, results, field){
        //             return error ? reject(error) : resolve(results);
        //         })
        //     })
        // }

        // const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, [], (error, results, field) => (error ? reject(error) : resolve(results))))
        
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query(
                "select no, name, date_format(reg_date, '%Y/%m/%d %H:%i:%s') as regDate, message from guestbook order by reg_date desc", 
                []
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    insert: async function(guestbook){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query(
                'insert into guestbook(name, password, message, reg_date) values (?, ?, ?, now())',
                Object.values(guestbook) //객체를 넣어주면 배열로 만들어준다
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }       
    },
    delete: async function(guestbook){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query(
                'delete from guestbook where no=? and password=?',
                Object.values(guestbook) //객체를 넣어주면 배열로 만들어준다
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }       
    }
}