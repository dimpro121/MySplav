document.getElementById('login-button').addEventListener('click', function (e) {
    e.preventDefault();
    const valueMail = document.getElementById('login-email').value;
    const valuePswd = document.getElementById('login-password').value;

    let data = {
        Email: valueMail,
        Psswd: valuePswd
    }
    let validationResult = ValidDataLogin(data);

    if (!(validationResult.emailError.length || validationResult.pswdError.length)) {
        fetch('/Login/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.user) {
                    location.href = location.href;
                } else {
                    ShowGeneralError(data.message)
                }
            })
            .catch(error => {
                ShowGeneralError("Неизвестная ошибка")
            });
    }
    else {
        ShowErrorLogin(validationResult);
    }
});

function ValidDataLogin(data) {
    let result = {
        emailError: "",
        pswdError: ""
    }

    if (!data.Psswd.length) {
        result.pswdError = "Пароль не может быть пустым"
    }

    if (!isValidEmailUnicode(data.Email)) {
        result.emailError = "Проверьте правильность написание почтового адреса"
    }

    return result;
}

function isValidEmailUnicode(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    return regex.test(email);
}

function ShowErrorLogin(data) {
    if (data.emailError.length) {
        const input = document.getElementById('login-email');
        const feedback = input.nextElementSibling;
        
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        feedback.textContent = data.emailError;
        feedback.style.display = 'block';
    }

    if (data.pswdError.length) {
        const input = document.getElementById('login-password');
        const feedback = input.nextElementSibling;

        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        feedback.textContent = data.pswdError;
        feedback.style.display = 'block';
    }
}

function ShowGeneralError(message) {
    if (message.length) {
        const input = document.getElementById('general-login-error');

        input.textContent = message;
        input.style.display = 'block';
    }
}