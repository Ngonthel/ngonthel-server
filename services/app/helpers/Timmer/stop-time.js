const formatTime = require('./formating-time')

module.exports = function stopTime(params){
    return formatTime(Date.now()-params)
}