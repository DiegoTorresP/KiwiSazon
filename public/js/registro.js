var recaptcha_response = '';

const errorUsername = document.getElementById('errorUser');
const errorNombre = document.getElementById('errorNombre');
const errorApellido = document.getElementById('errorApellido');
const errorEmail = document.getElementById('errorEmail');
const errorTelefono = document.getElementById('errorTelefono');
const errorPass = document.getElementById('errorContra');
const errorRecap = document.getElementById('errorRecap');
const errorImg = document.getElementById('errorImagen');

document.getElementById("miFormulario").addEventListener("submit", function(event) {
  event.preventDefault(); // Cancelar el envío del formulario
  console.log("Files: ",document.getElementById('files').value)
  var isValid = true;

  // Obtener los valores de los campos
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  var nombre = document.getElementById('nombre');
  var apellido = document.getElementById('apellido');
  var email =  document.getElementById('email');
  var telefono = document.getElementById('telefono');
  var imagen = document.getElementById('files');

  // Validar que los campos no estén vacíos
  if (username.value.trim() === "") {
    username.classList.add('is-invalid');
    errorUsername.style.display = 'block';
    isValid = false;
  } else {
    username.classList.remove('is-invalid');
    errorUsername.style.display = 'none';
  }


  if (password.value.trim() === "") {
    password.classList.add('is-invalid');
    errorPass.style.display = 'block';
    isValid = false;
  } else {
    password.classList.remove('is-invalid');
    errorPass.style.display = 'none';
  }

  if(nombre.value.trim() === ''){
    nombre.classList.add('is-invalid');
    errorNombre.style.display="block";
    isValid = false;
  }else {
    nombre.classList.remove('is-invalid');
    errorNombre.style.display = 'none';
  }

  if(apellido.value.trim() === ''){
    apellido.classList.add('is-invalid');
    errorApellido.style.display="block";
    isValid = false;
  }else {
    apellido.classList.remove('is-invalid');
    errorApellido.style.display = 'none';
  }

  if(email.value.trim() === ''){
    email.classList.add('is-invalid');
    errorEmail.style.display="block";
    isValid = false;
  }else {
    email.classList.remove('is-invalid');
    errorEmail.style.display = 'none';
  }

  if(telefono.value.trim() === ''){
    telefono.classList.add('is-invalid');
    errorTelefono.style.display="block";
    isValid = false;
  }else {
    telefono.classList.remove('is-invalid');
    errorTelefono.style.display = 'none';
  }

  if(imagen.value === ''){
    errorImg.style.display="block";
    isValid = false;
  }else {
    errorImg.style.display = 'none';
  }

  if (recaptcha_response.length == 0 || recaptcha_response == null) {
    errorRecap.style.display="block";   
    isValid = false;
  }else {
    errorRecap.style.display = 'none';
  }

  // Si pasa las validaciones, puedes enviar el formulario
  if (isValid) {
    this.submit();
  }
  
});

function verifyCaptcha(token) {
    recaptcha_response = token;
}

function showPassword() {
  var x = document.getElementById("password");
  var y = document.getElementById("password2");
  if (x.type && y.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}

document.getElementById('files').onchange = function () {
   console.log("Hello There")
  var src = URL.createObjectURL(this.files[0])
  document.getElementById('dp-pick').src = src
}