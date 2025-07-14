//Aquí se implementan las funciones de autenticación
//se usa localStorage para guardar el usuaario autenticado

import { api } from './api.js'; //Importa la API y las funciones de api.js

export const auth = {

    //Función para autenticar al usuario (Login)
    login: async (email, password) => {
        const users = await api.get(`/users?email=${email}`); //consulta la API para buscar el usuario por email
        if (users.length === 0 || users[0].password !== password) {
            throw new Error('Email o contraseña inválida.'); //lanza un error si las credenciales son inválidas
        } 
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user)); //guarda el usuario en el localStorage
    },


    //Función para registrar usuarios (Register)
    register: async (name, email, password) => {
        const existUser = await api.get(`/users?email=${email}`); //consulta que el email ya esté registrado
        if (existUser.length > 0 ) {
            throw new Error('El email ya está registrado.');
        }
        const newUser = {name, email, password: password};
        await api.post('/users',newUser); //agrega al nuevo usuario 
    },

    logout: () => {
        localStorage.removeItem('user'); //elimina el usuario registrado
    },

    //autentica que el usuario esta registrado
    isAuthenticated: () => {
        return !!localStorage.getItem('user'); //verifica sis existe el user y devuelve true
    },

    //devuelve el usuario autenticado
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null; //devuelve el user parseado o null si no existe
    }
};