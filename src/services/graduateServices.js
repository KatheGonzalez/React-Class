

// export const GetGraduates = async () => {   //vamos a usar fetch para comunicarnos con el backend 
//     const respuesta = await fetch('/test/egresados')
//     console.log('pase por aqui 1')
//     const informacion = await respuesta.json()
//     console.log('pase por aqui 2')
//     console.log(informacion)
//     console.log('pase por aqui 3')
// }

import axios from "axios";


export const GetGraduates = () => {   //vamos a usar fetch para comunicarnos con el backend 
    return fetch('/test/egresados') 
    .then(response => response.json())
    .then(body => body.data);
}


export const GetGraduatesAxios = () => {   //vamos a usar axios para comunicarnos con el backend 
    return axios.get('/test/egresados') 
    .then(response => response.data.data) 
} //se pone data dos veces porque una es la data de axios y la otra es la data nuestra)}


export const DeleteGraduateAxios = (dni)=>{
    return axios.delete(`/test/EGRESADOS/${dni}`)
}

export const UpdateGraduateAxios = (graduate) => {
    return axios.put(`/test/egresados/${graduate.dni}`, graduate)
}

export const CreateGraduateAxios = (newGraduate) => {
    return axios.post('/test/egresados', newGraduate)
}




