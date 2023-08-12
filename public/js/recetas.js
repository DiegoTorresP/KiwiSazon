document.getElementById('files').onchange = function () {
    console.log("Hello There")
 var src = URL.createObjectURL(this.files[0])
 document.getElementById('dp-pick').src = src
 }

 const errorNombre = document.getElementById('errorNombre');
 const errorIngredientes = document.getElementById('errorIngredientes');
 const errorPasos = document.getElementById('errorPasos');
 const errorTiempo = document.getElementById('errorTiempo');
 const errorPorciones = document.getElementById('errorPorciones');
 const errorTips = document.getElementById('errorTips');
 const errorImg = document.getElementById('errorImagen');

 document.getElementById("miFormulario").addEventListener("submit", function(event) {
   event.preventDefault(); // Cancelar el envío del formulario
   
   var isValid = true;
 
   // Obtener los valores de los campos
    var nombre = document.getElementById('platilloNombreCrear');
    var ingredientes = document.getElementById('ingredientesCrear');
    var pasos = document.getElementById('pasosSeguirCrear');
    var tiempo = document.getElementById('tiempoCrear');
    var porciones = document.getElementById('porcionesCrear');
    var tips = document.getElementById('tipsCrear');
    var imagen = document.getElementById('files');

   // Validar que los campos no estén vacíos
   if (nombre.value.trim() === "") {
     nombre.classList.add('is-invalid');
     errorNombre.style.display = 'block';
     isValid = false;
   } else {
     nombre.classList.remove('is-invalid');
     errorNombre.style.display = 'none';
   }
 
   if (ingredientes.value.trim() === "") {
    ingredientes.classList.add('is-invalid');
     errorIngredientes.style.display = 'block';
     isValid = false;
   } else {
    ingredientes.classList.remove('is-invalid');
     errorIngredientes.style.display = 'none';
   }

   
   if (pasos.value.trim() === "") {
    pasos.classList.add('is-invalid');
     errorPasos.style.display = 'block';
     isValid = false;
   } else {
    pasos.classList.remove('is-invalid');
     errorPasos.style.display = 'none';
   }

   if (tiempo.value.trim() === "") {
    tiempo.classList.add('is-invalid');
    errorTiempo.style.display = 'block';
    isValid = false;
  } else {
    tiempo.classList.remove('is-invalid');
    errorTiempo.style.display = 'none';
  }
  if (porciones.value.trim() === "") {
    porciones.classList.add('is-invalid');
    errorPorciones.style.display = 'block';
    isValid = false;
  } else {
    porciones.classList.remove('is-invalid');
    errorPorciones.style.display = 'none';
  }

  if (tips.value.trim() === "") {
    tips.classList.add('is-invalid');
    errorTips.style.display = 'block';
    isValid = false;
  } else {
    tips.classList.remove('is-invalid');
    errorTips.style.display = 'none';
  }
    if(imagen.value === ''){
        errorImg.style.display="block";
        isValid = false;
    }else {
        errorImg.style.display = 'none';
    }

    
   // Si pasa las validaciones, puedes enviar el formulario
   if (isValid) {
     this.submit();
     }
   
 });