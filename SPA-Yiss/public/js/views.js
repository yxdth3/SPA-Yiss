//Funciones para renderizado de vistas

import {api} from './api.js'; //implemente las funciones de API
import {auth} from './auth.js'; //implementa las funciones de autenticacion
import { router } from './router.js'; //implementa el router para redirigir las vistas despues accionar

export function renderNotFound() {
    document.getElementById('app').innerHTML = '<h2> Página no encontrada </h2>';
}


//Implementa la vista del login
export async function pageLogin() {
    document.getElementById('app').innerHTML = `
    <div class="login-container">
      <form id="form" class="login-form card">
        <h2 style="text-align:center; margin-bottom:1em;">Login</h2>
        <input type="email" id="e" placeholder="email">
        <input type="password" id="p" placeholder="pass">
        <button>Entrar</button>
        <br>
        <a href="#/register" data-link>¿No tienes cuenta? Regístrate</a>
      </form>
    </div>`;

    document.getElementById('form').onsubmit = async evento => {
        evento.preventDefault();

        try {
            await auth.login(evento.target.e.value, evento.target.p.value);
            location.hash = '#/dashboard';
            router();
        } catch (error) {
            alert(error.message);
        }
    };
}


//implementa la vista del register
export async function pageRegister() {
    document.getElementById('app').innerHTML = `
    <div class="login-container">
      <form id="form-register" class="login-form card">
        <h2 style="text-align:center; margin-bottom:1em;">Registro</h2>
        <input id="nombre" placeholder="nombre">
        <input id="email" placeholder="email">
        <input id="" placeholder="email">
        <button>Entrar</button>
        <br>
        <a href="#/register" data-link>¿No tienes cuenta? Regístrate</a>
      </form>
    </div>`;

    document.getElementById('form').onsubmit = async evento => {
        evento.preventDefault();

        try {
            await auth.login(evento.target.e.value, evento.target.p.value);
            location.hash = '#/dashboard';
            router();
        } catch (error) {
            alert(error.message);
        }
    };
}

//Implementa la vista principal (dashboard)
export async function pageDashboard () {
    const autenticado = auth.getUser();
    document.getElementById('app').innerHTML = `
    <h2>Bienvenido, ${u.name} (${u.role})</h2>
    <button id="out">Salir</button>
    <nav>
      <a href="#/dashboard/courses" data-link> Ver cursos </a>
      ${u.role === 'admin' ? `<a href="#/dashboard/courses/create" data-link>Crear curso</a>` : ''}
    </nav>`;
    document.getElementById('out').onclick = auth.logout;
    document.querySelectorAll('[data-link]').forEach(a => {
        a.onclick = evento => {
            evento.preventDefault();
            location.hash = a.getAttribute('href');
        };
    });
}


//Implementa la vista donde se ve la lista de los cursos 
export async function pageCourses() {
    const user = auth.getUser();
    const courses = await api.get('/courses');

    //la linea 98 muestra las opciones porsi el user es admin y la 99 muestra las opciones para el user = estudiante
    document.getElementById('app'),innerHTML = `
    <h2> Cursos disponibles </h2>
    <ul>${courses.map(curso => `
      <li>${curso.title || 'Sin título'} (${curso.capacity || 0} slots) — Instructor: ${curso.instructor || 'N/A'}
        ${user.role === 'admin' ? `<button onclick="editCourse(${curso.id})"> Editar </button>` : ''}  
        ${user.role === 'student' ? `<button class="enroll-btn" data-id="${curso.id}"> Inscribirse </button>` : ''}
      </li>`).join('')}
    </ul>`;


    if (user.role === 'student') {
        document.querySelectorAll('.enroll-btn').forEach(btn => {
            btn.onclick = async () => {
                const courseId = btn.database.id;

                //Mostrar los cursos actuales 
                const course = await api.get('/courses' + courseId);

                //Evitar una dobale inscripción 
                if (course.enrolled.includes(user.email)) {
                    alert('Ya estas inscrito a este curso');
                    return;
                }

                let capacity = course.capacity-1;


                //verifica la capacidad del curso
                if (course.enrolled.length >= course.capacity) {
                    alert('Este curso ya está lleno');
                    return;
                }

                course.enrolled.push(user.email);
                course.capacity = capacity;

                await api.put('/courses' + courseId, course);
                alert('Inscripción exitosa');
                pageCourses(); //Recarga la lista de cursos
            };
        });
    }
}



//Implementa la creacion de cursos, solo para user = admin (pageCreateCourse)
export async function pageCreateCourse() {
    document.getElementById('app').innerHTML = `
    <h2>Crear Curso</h2>
    <form id="form-create">
      <input placeholder="Título" id="title">
      <input placeholder="Instructor" id="instructor">
      <input type="number" placeholder="Capacidad" id="capacity">
      <button>Guardar</button>
    </form>`;
    document.getElementById('form-create').onsubmit = async evento => {
        evento.preventDefault();
        const data = {
            title : evento.target.title.value,
            instructor : evento.target.instructor.value,
            capacity : parseInt(evento.target.capacity.value)
        };
        await api.post('/courses',data);
        location.hash = '#/dashboard/courses';
        router();
    };
}



//Implementa la vista para editar los cursos, solo para user = admin (pageEditCourse)
export async function pageEditCourse() {
  const user = auth.getUser();
  if (user.role !== 'admin') {
    renderNotFound();
    return;
  }

  const courseId = location.hash.split('/').pop();
  const course = await api.get('/courses/' + courseId);

  if (!course) {
    renderNotFound();
    return;
  }

  document.getElementById('app').innerHTML = `
    <h2>Editar Curso</h2>
    <form id="form-edit">
      <input id="title" placeholder="Título" value="${course.title}">
      <input id="instructor" placeholder="Instructor" value="${course.instructor}">
      <input type="number" id="capacity" placeholder="Capacidad" value="${course.capacity}">
      <button>Guardar</button>
    </form>`;

  document.getElementById('form-edit').onsubmit = async evento => {
    evento.preventDefault();
    const updated = {
      title: evento.target.title.value,
      instructor: evento.target.instructor.value,
      capacity: parseInt(evento.target.capacity.value)
    };
    await api.put('/courses/' + courseId, updated);
    location.hash = '#/dashboard/courses';
    router();
  };
}