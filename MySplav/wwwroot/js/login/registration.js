document.getElementById('registration-button').addEventListener('click', function (e) {
    e.preventDefault();
    clearRegistrationErrors();

    const valueMail = document.getElementById('registration-email').value;
    const valuePassword = document.getElementById('registration-password').value;
    const valueRetryPassword = document.getElementById('registration-password-repeat').value;

    let data = {
        Email: valueMail,
        Password: valuePassword,
        RepeatPassword: valueRetryPassword
    }

    let validationResult = RegistrationValidDataLogin(data);

    if (!validationResult.isError) {
        fetch('/Login/Registration', {
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
                    RegistrationShowGeneralError(data.message)
                }
            })
            .catch(error => {
                RegistrationShowGeneralError("Неизвестная ошибка")
            });
    }
    else {
        RegistrationShowError(validationResult);
    }
});

function RegistrationValidDataLogin(data) {
    let result = {
        emailError: "",
        passwordError: "",
        repeatPasswordError: "",
        generalPasswordError: "",
        isError: false
    }

    if (!data.Password.length) {
        result.passwordError = "Пароль не может быть пустым";
        result.isError = true;
    }

    if (!data.RepeatPassword.length) {
        result.repeatPasswordError = "Необходимо повторить пароль";
        result.isError = true;
    }

    if (!result.isError && data.Password != data.RepeatPassword) {
        result.generalPasswordError = "Пароли должны совпадать";
        result.isError = true;
    }

    if (!isValidEmailUnicode(data.Email)) {
        result.emailError = "Проверьте правильность написание почтового адреса"
        result.isError = true;
    }

    return result;
}

function clearRegistrationErrors() {
    const inputRegistrationEmail = document.getElementById('registration-email');
    const feedbackRegistrationEmail = inputRegistrationEmail.nextElementSibling;
    inputRegistrationEmail.classList.remove('is-invalid');
    feedbackRegistrationEmail.textContent = "";
    feedbackRegistrationEmail.style.display = 'none';
    
    const inputRegistrationPassword = document.getElementById('registration-password');
    const feedbackRegistrationPassword = inputRegistrationEmail.nextElementSibling;
    inputRegistrationPassword.classList.remove('is-invalid');
    feedbackRegistrationPassword.textContent = "";
    feedbackRegistrationPassword.style.display = 'none';

    const inputRegistrationPasswordRepeat = document.getElementById('registration-password-repeat');
    const feedbackRegistrationPasswordRepeat = inputRegistrationEmail.nextElementSibling;
    inputRegistrationPasswordRepeat.classList.remove('is-invalid');
    feedbackRegistrationPasswordRepeat.textContent = "";
    feedbackRegistrationPasswordRepeat.style.display = 'none';

    const feedbackRegistrationPasswordGeneralErrors = document.getElementById('registration-general-password-error');
    feedbackRegistrationPasswordGeneralErrors.textContent = "";
    feedbackRegistrationPasswordGeneralErrors.style.display = 'none';
}

function RegistrationShowError(data) {
    if (data.emailError.length) {
        const input = document.getElementById('registration-email');
        const feedback = input.nextElementSibling;
        
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        feedback.textContent = data.emailError;
        feedback.style.display = 'block';
    }

    if (data.passwordError.length) {
        const input = document.getElementById('registration-password');
        const feedback = input.nextElementSibling;

        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        feedback.textContent = data.passwordError;
        feedback.style.display = 'block';
    }

    if (data.repeatPasswordError.length) {
        const input = document.getElementById('registration-password-repeat');
        const feedback = input.nextElementSibling;

        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        feedback.textContent = data.repeatPasswordError;
        feedback.style.display = 'block';
    }

    if (data.generalPasswordError.length) {
        const feedback = document.getElementById('registration-general-password-error');
        feedback.textContent = data.generalPasswordError;
        feedback.style.display = 'block';
    }
}

function RegistrationShowGeneralError(message) {
    if (message.length) {
        const input = document.getElementById('registration-general-password-error');

        input.textContent = message;
        input.style.display = 'block';
    }
}