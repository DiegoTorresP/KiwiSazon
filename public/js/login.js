var errores = 0;

const errorUsername = document.getElementById('errorUser');
const errorPass = document.getElementById('errorContra');

function submitUserForm() {
    errores=0;
    var username = document.getElementById('username');
    var pass = document.getElementById('password');
    if(username.value.trim() === '' ){
        username.classList.add('is-invalid');
        errorUsername.style.display="block";
        errores++;
    }
    
      if(pass.value.trim() === '' || pass.length<8){
      pass.classList.add('is-invalid');
      errorPass.style.display="block";
      errores++;
    }

    if(errores>0){
      return false;
    }
    
    return true;
      
}