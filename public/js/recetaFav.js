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
     
                 window.location.reload();
               }
             } catch (error) {
               console.error('Error:', error);
             }
           });
         });