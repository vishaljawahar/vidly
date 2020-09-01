// Imports
const config = require('config');

//Authentication handling
module.exports = function() {
    if(!config.get('jwtPrivateKey')) {
        throw new Error ('FATAL ERROR: jwtPrivateKey is not defined');
    }
}