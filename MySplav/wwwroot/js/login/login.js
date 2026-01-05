document.getElementById('login-button').addEventListener('click', function (e) {
    e.preventDefault();
    const valueMail = document.getElementById('login-email').value;
    const valuePassword = document.getElementById('login-password').value;

    let data = {
        Email: valueMail,
        Password: valuePassword
    }
    let validationResult = LoginValidData(data);

    if (!(validationResult.emailError.length || validationResult.passwordError.length)) {
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
                    LoginShowGeneralError(data.message)
                }
            })
            .catch(error => {
                LoginShowGeneralError("Неизвестная ошибка")
            });
    }
    else {
        LoginShowError(validationResult);
    }
});

function LoginValidData(data) {
    let result = {
        emailError: "",
        passwordError: ""
    }

    if (!data.Password.length) {
        result.passwordError = "Пароль не может быть пустым"
    }

    if (!isValidEmailUnicode(data.Email)) {
        result.emailError = "Проверьте правильность написание почтового адреса"
    }

    return result;
}

function LoginShowError(data) {
    if (data.emailError.length) {
        const input = document.getElementById('login-email');
        const feedback = input.nextElementSibling;
        
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        feedback.textContent = data.emailError;
        feedback.style.display = 'block';
    }

    if (data.passwordError.length) {
        const input = document.getElementById('login-password');
        const feedback = input.nextElementSibling;

        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        feedback.textContent = data.passwordError;
        feedback.style.display = 'block';
    }
}

function LoginShowGeneralError(message) {
    if (message.length) {
        const input = document.getElementById('general-login-error');

        input.textContent = message;
        input.style.display = 'block';
    }
}