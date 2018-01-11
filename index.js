const random  = require('random-string'); 
const times   = require('lodash/times'); 
const shuffle = require('lodash/shuffle'); 
const Promise = require('bluebird'); 
const config  = require('./config'); 

const updateDb   = require('./db'); 
const vkWallPost = require('./request'); 

const LIKES = config.app.likes.values;  

const generate = (amount) => {
  return times(amount).map(() => {
    return times(5).map(() => random({
      length: 5,
      numeric: true, 
      letters: true 
    })).join('-');    
  })
}; 

const start = async () => {
  const promoCodes = generate(LIKES.length);  
  const currentSet = shuffle(LIKES).reduce((result, amount, index) => {
    result[promoCodes[index]] = amount; 
    return result; 
  }, {}); 

  try {
    await updateDb(currentSet); 
    await vkWallPost(config.vk.groupId, 'hello'); 
  } catch(e){
    console.log('Error %s', e); 
  }

  console.log('Done'); 
        
}

(async() => {
  start(); 
})(); 