module.exports = function formatTime(duration) {
    let seconds = Math.floor((duration ) % 60),
        minutes = Math.floor((duration / ( 60)) % 60),
        hours = Math.floor((duration / ( 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return {
        date:(hours + ":" + minutes + ":" + seconds),
        minute:Math.floor(duration/60),
        time:duration
    }
}