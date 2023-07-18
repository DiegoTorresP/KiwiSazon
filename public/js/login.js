const errorUsername = document.getElementById('errorUser');
const errorPass = document.getElementById('errorContra');
document.getElementById("miFormulario").addEventListener("submit", function(event) {
  event.preventDefault(); // Cancelar el envío del formulario
  
  var isValid = true;

  // Obtener los valores de los campos
  var username = document.getElementById("username");
  var password = document.getElementById("password");

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

  // Si pasa las validaciones, puedes enviar el formulario
  if (isValid) {
    this.submit();
    }
  
});