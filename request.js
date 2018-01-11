const qs      = require('querystring'); 
const request = require('request'); 
const Promise = require('bluebird'); 
const config  = require('./config').vk;  

const BASE_URL = 'https://api.vk.com/method/wall.post'; 

module.exports = (data) => {
  return new Promise((resolve, reject) => {
  	const params   = qs.encode({
      access_token: config.apiKey, 
      v           : config.apiVersion,  
      owner_id    : data.ownerId,  
      message     : data.message 
    }); 
  	const url  = [BASE_URL, params].join('?'); 
  	request.get(url, (err, response, body) => {
      if( err ) {
      	console.log('Wall.post failed with error: %s', err); 
      	return reject(err); 
      }
      console.log(body); 
      resolve(true); 
  	}) 
  })
}