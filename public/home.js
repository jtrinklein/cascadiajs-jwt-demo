var output = document.getElementById('output');
function writeOutput(data) {
    output.innerHTML = data;
}

function setInvalidToken() {
    localStorage.setItem('jwt', 'iaminvalid');
    writeOutput('invalid token set');
}

function clearToken() {
    localStorage.removeItem('jwt');
    writeOutput('token removed');
}

function checkValid() {
    var token = localStorage.getItem('jwt');
    if(!token) {
        writeOutput('token not set');
        return;
    }

    $.ajax({
        type: "GET",
        url: "/verify",
        headers: { Authorization: 'Bearer ' + token}
    }).success(function(res) {
        var isvalid = res === "true";

        if(isvalid) {
            writeOutput('token is valid!');
        } else {
            writeOutput('token is not valid!');
        }
    });
}
var token = localStorage.getItem('jwt');

if(token) {
    writeOutput('found a token!');
} else {
    writeOutput('no token set');
}


