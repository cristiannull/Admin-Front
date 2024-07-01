# Admin-Front

## Descripción
Este proyecto es una aplicación web desarrollada con Angular que permite la gestión de usuarios, videojuegos y categorias.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura:

├── app/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── cards.component.ts
│   │   │   ├── cards.component.html
│   │   │   └── cards.component.css
│   │   ├── cards-users/
│   │   │   ├── cards-users.component.ts
│   │   │   ├── cards-users.component.html
│   │   │   └── cards-users.component.css
│   │   └── nav/
│   │        ├── nav.component.ts
│   │        ├── nav.component.html
│   │        └── nav.component.css
│   ├── pages/
│   │   ├── edit-user/
│   │   │   ├── edit-user.component.ts
│   │   │   ├── edit-user.component.html
│   │   │   └── edit-user.component.css
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.css
│   │   ├── edit-product/
│   │   │   ├── edit-product.component.ts
│   │   │   ├── edit-product.component.html
│   │   │   └── edit-product.component.css
│   │   ├── new-product/
│   │   │   ├── new-product.component.ts
│   │   │   ├── new-product.component.html
│   │   │   └── new-product.component.css
│   │   ├── product-list/
│   │   │   ├── product-list.component.ts
│   │   │   ├── product-list.component.html
│   │   │   └── product-list.component.css
│   │   ├── register/
│   │   │   ├── register.component.ts
│   │   │   ├── register.component.html
│   │   │   └── register.component.css
│   │   ├── search/
│   │   │   ├── search.component.ts
│   │   │   ├── search.component.html
│   │   │   └── search.component.css
│   │   ├── user-list/
│   │   │   ├── user-list.component.ts
│   │   │   ├── user-list.component.html
│   │   │   └── user-list.component.css
│   │   └── app.component.ts
│   │
│   ├── guards/
│   │   ├── redirectIfLogged.guard.ts
│   │   └── login.guard.ts
│   │
│   ├── models/
│   │   ├──User.model.ts
│   │   └── videogame.ts
│   │
│   ├── service/
│   │   ├── categories.service.ts
│   │   ├── user.service.ts
│   │   └── videogames.service.ts
│   │
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.module.ts
│   ├── app.routes.ts
│   └── app.config.ts
│
├── assets/
│   └── favicon.ico
│
├── index.html
├── main.ts
├── styles.css
├── favicon.ico
├── package.json
└── README.md


## Tecnologías Utilizadas
- **Angular CLI**: Framework de desarrollo frontend.
- **Bootstrap**: Para el diseño y estilos de la interfaz.
- **FontAwesome**: Iconos para mejorar la interfaz.
- **MongoDB**: Base de datos utilizada para almacenar los datos.
- **Mongoose**: Librería de modelado de objetos para MongoDB.
- **PrimeNG**: Componentes UI adicionales para Angular.
- Otros módulos y componentes de Angular según sea necesario.

## Configuración y Ejecución Local
1. **Clona el repositorio:**
    - git clone https://github.com/cristiannull/Admin-Front.git.

2. **Instalación de Dependencias:**
   - npm install.

3. **Iniciar el servidor:**
   - ng serve.   
   - La aplicación estará disponible en `http://localhost:4200/`.   
   - para que funcione correctamente debes tener tambien la api la cual se encuentra aqui: `https://github.com/cristiannull/Back-proyecto-final-2` no olvides iniciar el servidor en la api.  
   - Para poder ver los cambios que realices debes tener este repositorio: `https://github.com/cristiannull/Front-proyecto-final-2` clonado y corriendo en un puerto.   

## Funcionalidades Principales
   - **Login:**: Barra de navegación principal.   
   - **Listado y Edición de Productos:**: Pie de página. 
   - **Búsqueda y Filtrado**: Componente para mostrar tarjetas de videojuegos.
   - **Gestión de Usuarios:**: Componente para mostrar y gestionar el carrito de compras.

   ## Información Adicional
   Descripción de Componentes:
   - **NavComponent**: Barra de navegación principal.   
   - **CardsComponent**: Componente para mostrar y gestionar videojuegos.
   - **CardsUsersComponent**: Componente para mostrar y gestionar los usuarios.
   Guards:/
    - **loginGuard**:  Redirige a la página de inicio de sesión si no hay un token de usuario.
    - **redirectIfLogged**: Redirige a la lista de videojuegos si hay un token de usuario presente.
