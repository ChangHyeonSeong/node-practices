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
                'select no, first_name as firstName, last_name as lastName, email from emaillist order by no desc', 
                []
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    insert: async function(emaillist){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query(
                'insert into emaillist(first_name, last_name, email) values (?, ?, ?)',
                Object.values(emaillist) //객체를 넣어주면 배열로 만들어준다
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }       
    }
}