         // Agrega un evento click a los enlaces con la clase "favorite-link"
           

         const favoriteLinks = document.querySelectorAll('.favorite-link');
         favoriteLinks.forEach(link => {
           link.addEventListener('click', async (event) => {
             event.preventDefault();
     
             const recetaId = link.getAttribute('data-id');
             
             try {
               const response = await fetch(`/favorite/${recetaId}`, {
                 method: 'POST',
                 headers: {
                   'Content-Type': 'application/json'
                 },
                 // Puedes agregar más opciones al cuerpo de la solicitud si es necesario
                 body: JSON.stringify({ recetaId })
               });
     
               // Manejar la respuesta si es necesario
               if (response.ok) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Receta gruarda ',
                  text: 'La receta se agrego a tus favoritos',
                  showConfirmButton: false,
                  timer: 5000
                });
                 window.location.reload();
               }
             } catch (error) {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Opps ... ',
                text: 'Hubo un error al guardar la receta',
                showConfirmButton: false,
                timer: 5000
              });
               console.error('Error:', error);
             }
           });
         });