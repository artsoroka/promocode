const mysql   = require('mysql');
const Promise = require('bluebird'); 
const config  = require('./config').database; 

const connection = mysql.createConnection(config); 

const insert = (promoCode, type, amount) => {
  return new Promise((resolve, reject) => {

    connection.query(
      'INSERT INTO promo_code (code, type, amount) VALUES(?,?,?)', 
      [promoCode, type, amount], 
      (err, results, fields) => {
       
        if( err ){
          connection.end(); 
          console.log('Failed to insert a record %s', err); 
          return reject(err); 
        } 
        console.log('Created new record with id %d', results.insertId);
        resolve(results.insertId);  
      }
    ); 

  }); 
}; 

module.exports = async (promoCodes) => {
  connection.connect(); 

  for(let i in promoCodes){
    const code = i; 
    const amount = promoCodes[i]; 
    await insert(code, 'sale', amount); 
  }  
  connection.end(); 

}; 