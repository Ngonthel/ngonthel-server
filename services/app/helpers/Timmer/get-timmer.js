const stopTime = require('./stop-time')
const startTime = require('./start-time')

module.exports = function responseLeaderBoard(paramsCache){
    if (paramsCache){
        return stopTime(paramsCache)
    } else {
        return startTime()
    }
}