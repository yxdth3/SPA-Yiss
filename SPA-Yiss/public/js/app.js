//Se inicializa el enrutador y cualqueir lógica global.

import './api.js'; //Implemente la API de api.js
import './auth.js'; //Implementee la autenticación de auth.js
import {router} from './router.js';  //Implementa la función que enruta las páginas desde router.js


window.addEventListener('DOMContentLoaded', router); //Inicia el enrutador cuando carga la página
window.addEventListener('hashchange', router); //Vuelve a iniciar el enrutador cuando cambia el hash de la URL
