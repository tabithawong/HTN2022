var xhr = null;

getXmlHttpRequestObject = function () {
    if (!xhr) {
        // Creating a new XMLHttpRequest object
        xhr = new XMLHttpRequest();
    }
    return xhr;
};
function dataCallback() {
    // Check response is ready or not
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("User data received!");
        getDate();
        dataDiv = document.getElementById('result-container');
        // Set current data text
        dataDiv.innerHTML = xhr.responseText;
    }
}

function sendDataCallback() {
    // Check if response is ready or not
    if (xhr.readyState == 4 && xhr.status == 201) {
        console.log("Data creation response received!");
        getDate();
        dataDiv = document.getElementbyId('sent-data-container');
        // Set current data text
        dataDiv.innerHTML = xhr.responseText;
    }
}

function getUsers() {
    console.log("Get users...");
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = dataCallback;
    // asynchronous requests
    xhr.open("GET", "http://localhost:6969/users", true);
    // Send the request over the network
    xhr.send(null);
}

function sendData() {
    dataToSend = document.getElementbyId('data-input').value;
    if (!dataToSend) {
        console.log("Data is empty.");
        return;
    }
    console.log("Sending data: " + dataToSend);
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = sendDataCallback;
    // async requests
    xhr.open("POST", "http://localhost:6969/users", true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    // sending the request over the network
    xhr.send(JSON.stringify({"data": dataToSend}));
}

function getDate() {
    date = new Date().toString();
    document.getElementById('time-container').textContent
        = date;
}
(function () {
    getDate();
})();