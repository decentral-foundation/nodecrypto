const crypto = require("crypto");


/** 
 * @description set random encryption key
 * @param {string} ENC_KEY - ENC_KEY can be generated as crypto.randomBytes(32).toString('hex');
 * @param {string} IV - bunch of numbers need to count
 */
const ENC_KEY = "bf3c199c2471cb488d907b1e0927c37b"; 
const IV = "5183666a72aec9e4"; 


const phrase = "free yourself from social media now";

let encrypt = ((val) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf-8', 'base64'); // might need to update for config
  encrypted += cipher.final('base64');
  return encrypted;
});

let decrypt = ((encrypted) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf-8'); // might need to update for config
  return (decrypted + decipher.final('utf-8'));
});

module.exports = {
	encrypt, decrypt
}