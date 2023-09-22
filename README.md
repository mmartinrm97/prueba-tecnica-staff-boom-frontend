
# StaffBoom Task Management App - Frontend

Este repositorio contiene el código fuente del frontend de la aplicación web de gestión de tareas desarrollada para la prueba técnica de StaffBoom Perú. La aplicación se ha construido utilizando Nuxt 3.

## Requisitos Previos

Antes de comenzar a ejecutar la aplicación localmente, asegúrate de tener instalados los siguientes requisitos previos:

- Node.js (versión 14 o superior)
- npm (normalmente se instala junto con Node.js)
- Backend de la aplicación configurada y en ejecución (sigue los pasos en el README del backend) https://github.com/mmartinrm97/prueba-tecnica-staff-boom-backend
- Editor de código (recomendado: Visual Studio Code o WebStorm

## Configuración Inicial

Siga estos pasos para configurar la aplicación frontend localmente:

1. Clona este repositorio en tu máquina local:

   ```bash
   https://github.com/mmartinrm97/prueba-tecnica-staff-boom-backend.git
   ```

2. Navega a la carpeta del proyecto:

   ```bash
    cd prueba-tecnica-staff-boom-backend
    ```

3. Instala las dependencias de JavaScript:

   ```bash
   # npm
   npm install
   
   # pnpm
   pnpm install
   
   # yarn
   yarn install
   ```
4. Copia el archivo .env.example y renómbralo a .env. Luego, configura la variable de entorno NUXT_API_BACKEND_URL, NUXT_API_FRONTEND_URL_ en el archivo .env para que apunte al backend de tu aplicación

   ```dotenv
    NUXT_API_BACKEND_URL=http://localhost:8000
    NUXT_API_FRONTEND_URL=http://localhost:3000
   ```


## Ejecutando la Aplicación

Después de configurar la aplicación frontend, puedes ejecutarla localmente con el siguiente comando:

   ```bash
   # npm
   npm run dev
   
   # pnpm
   pnpm run dev
   
   # yarn
   yarn dev
   ```

Esto iniciará un servidor de desarrollo en http://localhost:3000. Abre tu navegador web y navega a esta dirección para acceder a la aplicación frontend

Abre tu navegador web y navega a esa dirección para acceder a la aplicación. Las credenciales son las siguientes:

    - Email: admin@example.com
    - Password: password

ó

    - Email: standard@example.com
    - Password: password

