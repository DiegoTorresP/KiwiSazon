var recaptcha_response = '';
var errores = 0;
var username = document.getElementById('username');
var nombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
var email =  document.getElementById('email');
var telefono = document.getElementById('telefono');
var pass = document.getElementById('password');
const errorUsername = document.getElementById('errorUser');
const errorNombre = document.getElementById('errorNombre');
const errorApellido = document.getElementById('errorApellido');
const errorEmail = document.getElementById('errorEmail');
const errorTelefono = document.getElementById('errorTelefono');
const errorPass = document.getElementById('errorContra');
const errorRecap = document.getElementById('errorRecap');
function submitUserForm() {
  errores=0;
  if(username.value.trim() === ''){
    username.classList.add('is-invalid');
    errorUsername.style.display="block";
    errores++;
  }
  if(nombre.value.trim() === ''){
    nombre.classList.add('is-invalid');
    errorNombre.style.display="block";
    errores++;
  }
  if(apellido.value.trim() === ''){
    apellido.classList.add('is-invalid');
    errorApellido.style.display="block";
    errores++;
  }
  if(email.value.trim() === ''){
    email.classList.add('is-invalid');
    errorEmail.style.display="block";
    errores++;
  }
  if(telefono.value.trim() === ''){
    telefono.classList.add('is-invalid');
    errorTelefono.style.display="block";
    errores++;
  }
  if(pass.value.trim() === ''){
    pass.classList.add('is-invalid');
    errorPass.style.display="block";
    errores++;
  }
  if (recaptcha_response.length == 0 || recaptcha_response == null) {
        //alert("Error", "Es necesario validar el recaptcha", "error");
        errorRecap.style.display="block";
        errores++;
 }
  if(errores>0){
    return false;
  }
  
  if(errores == 0){
    return true;
  }
    
}

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