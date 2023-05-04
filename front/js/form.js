const form = document.querySelector('form');
const nameInput = form.querySelector('input[type="text"]');
const emailInput = form.querySelector('input[type="email"]');
const messageInput = form.querySelector('textarea');
const errorColor = '#FF4136'; // Fondo rojo

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Detenemos el envío del formulario para hacer la validación

    // Validamos el campo de nombre
const nameValue = nameInput.value.trim();
if (nameValue.length < 3 || nameValue.length > 15 || !/^[a-zA-Z]+$/.test(nameValue)) {
    const nameError = nameInput.nextElementSibling;
    nameError.classList.add('error');
    nameError.innerHTML = 'El nombre debe tener entre 3 y 15 letras y solo se permiten letras';

    setTimeout(function() {
        nameError.classList.remove('error');
        nameError.innerHTML = '';
    }, 3000);

    return;
}

// Validamos el campo de correo electrónico
const emailValue = emailInput.value.trim();
if (!/^[^\s@]+@[^\s@]+\.(gmail|hotmail)\.com$/.test(emailValue)) {
    const emailError = emailInput.nextElementSibling;
    emailError.classList.add('error');
    emailError.innerHTML = 'Ingrese una dirección de correo electrónico de Gmail o Hotmail válida';

    setTimeout(function() {
        emailError.classList.remove('error');
        emailError.innerHTML = '';
    }, 3000);

    return;
}

// Validamos que no se permitan correos temporales
const tempEmails = ['@tempmail', '@guerrillamail', '@mailinator', '@10minutemail', '@temp-mail'];
if (tempEmails.some(tempEmail => emailValue.includes(tempEmail))) {
    const emailError = emailInput.nextElementSibling;
    emailError.classList.add('error');
    emailError.innerHTML = 'No se permiten correos temporales';

    setTimeout(function() {
        emailError.classList.remove('error');
        emailError.innerHTML = '';
    }, 3000);

    return;
}


    // Si la validación es exitosa, enviamos el formulario
    form.submit();
});
