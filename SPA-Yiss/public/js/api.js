//Aqui se implementan las funciones para comunicarte con la API 
//Realizar pedticoones HTTP cpn Fetch (GET, POST, PUT, DELETE)

export const api = {
    url: 'http://localhost:3000',

    //función GET
    get: async parametro => {
        try {
            const respuesta = await fetch(`${api.url}${parametro}`);
            if (!respuesta.ok) {
                throw new Error('Error al obtener datos');
            }
            return await respuesta.json();
        }catch (error) {
            console.log('Error en la petición GET:', error);
            throw error;
        }
    },

    //función POST
    post: async (parametro,data) => {
        try {
            const respuesta = await fetch(`${api.url}${parametro}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!respuesta.ok) {
                throw new Error('Error al crear los datos');
            }
            return await respuesta.json();
        } catch (error) {
            console.error('Error en la petición POST:', error);
            throw error;
        }
    },

    //función put
    put: async (parametro, data) => {
    try {
      const response = await fetch(`${api.base}${parametro}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Error al actualizar los datos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en la petición PUT:', error);
      throw error;
    }
  },

  //función delete
  delete: async parametro => {
    try {
        const respuesta = await fetch(`${api.url}${parametro}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error ('Error al eliminar los datos');
        }
        return await respuesta.json();
    } catch (error) {
        console.error('Error en la petición DELETE:', error);
        throw error;
    }
  }
}