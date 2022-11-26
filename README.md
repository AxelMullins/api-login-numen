# API-LOGIN

## Primeros pasos:
1. Crear el proyecto con express generator
    `express --no-view api-login`
2. Instalar librerías
    `npm i bcryptjs dotenv express-session express-validator jsonwebtoken mongoose cors`
3. Crear carpetas
    - controllers
    - middlewares
    - db
    - models
4. Crear archivos
    - .env
    - .gitignore
    - README.md
5. Importar y ejecutar `cors` en `app.js`

<hr>

## Conexión con mongoDB
1. Crear proyecto y cluster en [MongoDB](https://www.mongodb.com/products/compass)
    - Crear archivo `db/db.js`
    - Código para conextar la base de datos
    - Importar y ejecutar en `app.js`
2. Agregar variable de entorno `MONGO_CNN` en `.env`

## Schema de usuario

1. Crear archivo `models/users.js`

## Controllers
1. Crear archivo `controllers/controller.js` con sus respectivos cb
    - Registrar `newUser`
    - Ver todos los usuarios `allUsers`
    - Ver un usuario `user`
    - Editar password `editPassword`
    - Borrar usuario `deleteUser`
    - Login `login`
    - Logout `logout` 

    Opcionales
    - Ver todos los logs de usuarios `allLogs` 
    - Ver logs de usuario `userLogs` 
        -  (para esto necesitamos acrear un schema `logs.js` para almacenar estos datos)

## Middlewares
1. Validar ID `validateId.js`
2. Autentificar sesión `authSession.js` 
2. Autentificar JWT `authJWT.js` 

## Helpers
1. Generar un JWT `generateJWT`