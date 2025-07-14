import {auth} from './auth.js'; //Implementa la autenticación de auth.js
import {
    pageLogin, //Vista de login
    pageRegister, //Vista de registro
    pageDashboard, //Vista de inicio 
    pageCourses, //Vista de cursos
    pageCreateCourse, //Vista de creación de curso
    pageEditCourse, //Vista de edición de curso
    renderNotFound //Vista de página no encontrada
} from './views.js'; //Importa las vistas desde views.js

//Se definen las rutas de la SPA
const routes = {
    '#/login': pageLogin, // Ruta para la vista de login
    '#/register': pageRegister, // Ruta para la vista de registro   
    '#/dashboard': pageDashboard, // Ruta para la vista de dashboard
    '#/dashboard/courses': pageCourses, // Ruta para la vista de cursos
    '#/dashboard/courses/create': pageCreateCourse, // Ruta para la vista de creación de curso
    '#/dashboard/courses/edit': pageEditCourse, // Ruta para la vista de edición
};


//Función que maneja el enrutamiento de la SPA
export function router() {
    const path = location.hash || '#/login'; // Obtiene el hash de la URL o redirige a login por defecto
    const user = auth.getUser(); // Obtiene el usuario autenticado

    // Protege rutas que requieren autenticación
    if (path.startsWith('#/dashboard') && !user.isAuthenticated()) {
        location.hash = '#/login'; // Redirige a login si no hay usuario autenticado
        return;
    }

    //Evitar que usuarios autenticados accedan a la vista de login o register
    if ((path === '#/login' || path === '#/register') && user?.isAuthenticated()) {
        location.hash = '#/dashboard'; // Redirige a dashboard si ya está autenticado
        return;
    }

    //Cargar la vista correspondiente 
    const view = routes[path];
    if (view) {
        view(); // Llama a la función de la vista correspondiente
    } else {
        renderNotFound(); // Manda a la vista de página no encontrada si la ruta no existe
    }
}