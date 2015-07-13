function login() {
    var user = document.getElementById('username').value;
    $.post('/auth', {user: user})
        .success(function (response) {
            var token = response;
            localStorage.setItem('jwt', token);
            window.location = "/home.html";
        });
}
    
