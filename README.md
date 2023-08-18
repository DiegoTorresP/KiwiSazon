# KiwiSazon 👨‍🍳👩‍🍳
Repositorio de documentación para KiwiSazon
# Objetivo 💡
Crear una aplicación web donde los amantes de la cocina puedan compartir y descubrir recetas. Con la finalidad de descubrir e interactuar con personas apasionadas con la gastronomía. 
# Enlace Trello 🗃️
- https://trello.com/invite/kiwisazon/ATTI2de397c980d7ef75f0944330a7bb4fdb1E0EBEDB
# Código Fuente 💻
| Estructura de repositorio | Segmento | Funcionalidad |
| ------------ | ------------ | ------------- |
| ![image](https://github.com/DiegoTorresP/KiwiSazon/assets/87044529/d1dcd194-685f-484b-92f6-ffb211c2cced)| <h3 centered>BackEnd</h3>| <ul><li>Bin: Configuración de servidor</li><li>Config: Conexión con base de datos</li><li>Controllers: Clases de control para llamadas a métodos Dao</li><li>Dao: Clases accesoras a los datos.</li><li>Middlewares: Procesos intermedios para ruta (validaciones, protección de rutas y sesiones)</li><li>Models: Estructura de las entidades del programa.</li><ul>|
| ![image](https://github.com/DiegoTorresP/KiwiSazon/assets/87044529/c892248f-72c2-4e80-95d0-6b415d5d3639)| <h3 centered>FrontEnd</h3>|<ul><li>Public: Hojas de estilo, js's y recursos gráficos</li><li>Routes: Llamadas al servidors.</li><li>Uploads: Almacenamiento local de imagenes.</li><li>Views: Vistas del sistema</li><ul>|
# Arquitectura 🚧
- BackEnd con NodeJS
- FrontEnd con Express.js

![image](https://github.com/DiegoTorresP/KiwiSazon/assets/87044529/8af3cd7b-6e5c-431a-912d-2c2346dd00de)
# Mecanismos de Seguridad 🛟
- Validación de datos (FrontEnd)
  
  <img width="960" alt="image" src="https://github.com/DiegoTorresP/KiwiSazon/assets/87044529/ca57f880-6f15-4336-a787-3ae5d3e68b2b">

- Protección de rutas
  
  <img width="960" alt="image" src="https://github.com/DiegoTorresP/KiwiSazon/assets/87044529/e6c7b558-e76b-4373-b16a-1ebacf97a1c1">

- Recaptcha
  
  <img width="960" alt="image" src="https://github.com/DiegoTorresP/KiwiSazon/assets/87044529/c2722f0a-af4d-41fb-b39f-e6945a0d2ce0">

- Manejo de sesiones con JWT
  
<img width="960" alt="image" src="https://github.com/DiegoTorresP/KiwiSazon/assets/87044529/9fce87b4-e7ac-463d-b70a-0f47f0c3dddc">

# Web Services 🌐
- Arquitectura REST para integrar FrontEnd con BackEnd

<img width="960" alt="image" src="https://github.com/DiegoTorresP/KiwiSazon/assets/87044529/2833e864-a724-4ef6-9ad2-d52c71a00413">

# Evidencia de Despliegue 💻
- https://drive.google.com/file/d/1hnmR504BOJk5-fuS114JLBN78Tq5MypV/view?usp=sharing

# Arquitectura de despliegue 💻
- Ubuntu Server 20.04 LTS (HVM) SSD Volumen Type
- Utiliza un tipo de servidor T2.micro
- Firewall(grupo de seguridad ) Asignando a un grupo en dónde se asignan únicamente los puertos abiertos a utilizar
- Almacenamiento 1 volumen de 8GiB

# Resultado
- https://kiwisazon.onrender.com/
- http://3.214.58.214:3001/ 




