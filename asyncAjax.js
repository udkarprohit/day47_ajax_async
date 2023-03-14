function showTime(){
    const date = new Date();
    return date.getHours() +" HRS" + date.getMinutes() + " " + " Mins" + date.getDate() + " Seconds";
}

function showSessionExpire(){
    console.log("Acticity-B Your session expired at " + showTime());
}

console.log("Acticity-A Triggerring Activity-B at " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Acticity-A Triggerring Activity-B at " + showTime() + " will be started after 5 seconds");
