document.getElementById('button-logout').addEventListener('click', function (e) {
    e.preventDefault();
    
    fetch('/Login/Logout')
    .then(response => {
        return response.json()
    })
    .then(data => {
        location.href = location.href;
    })
    .catch(error => {
    });
});