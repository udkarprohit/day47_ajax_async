let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime(){
    const date = new Date();
    return date.getHours() +" HRS " + date.getMinutes() + " " + " Mins " + date.getDate() + " Seconds";
}
function makePromiseCall(methodType, url,  async=true, data=null){
    return new Promise( function (resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            // console.log("State Changed Called. Ready State: " + xhr.readyState + "Status:" + xhr.status);
            if(xhr.status.toString().match("^[2][0-9]{2}$") ){
                resolve(xhr.responseText);
            }else if(xhr.status.toString().match("[4,5][0-9]{2}")){
                reject({
                    status: xhr.status,
                    statusText : xhr.statusText
                });
                console.log("Handle 400 Client Error or 500 Server Error at: " +  showTime());
            }
    }
    xhr.open(methodType, url, async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType + " Request sent to the Server");
});
}
const getURL = "http://localhost::3000/employess/1";
makePromiseCall("GET", getURL, true).then(responseText => {
    console.log("Get User Data: " + responseText)
}).catch(error => console.log("GET Error Status :" + JSON.stringify(error)));
const deleteURL = "http://localhost:3000/employees/4";
console.log("Made GET AJAX Call to Server at " + showTime());

makePromiseCall("DELTE", deleteURL, false).then(responseText => {
    console.log("User Deleted: " + responseText)
}).catch(error => console.log("DELETE Error Status :" + JSON.stringify(error)));
console.log("Made DELETE AJAX Call to Server at " + showTime());


const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "salary" : "5000"};

makePromiseCall("POST", postURL, true, emplData).then(responseText => {
    console.log("User Added: " + responseText)
}).catch(error => console.log("POST Error Status:" + JSON.stringify(error)));
console.log("Made POST AJAX Call to Server at " + showTime());