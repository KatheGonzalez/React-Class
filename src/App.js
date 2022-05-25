import { useEffect, useState } from "react";
import { GetGraduatesAxios, DeleteGraduateAxios, UpdateGraduateAxios, CreateGraduateAxios } from "./services/graduateServices.js";
import { Graduate } from "./modelsclass/graduateDefinition.js";
import { Welcome} from "./components/welcome.js";

function App() {
  const [graduates, setGraduates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graduateSelected, setgraduateSelected] = useState(new Graduate()); 
  const [graduateCreated, setgraduateCreated] = useState(new Graduate()); 
  const [indexGraduate, setIndexGraduate] = useState(-1);
  
   // graduates se preserva en el tiempo , como estado actual    ---- setState 
  useEffect(() => {
    async function GetInfo () {
      const graduatesList = await GetGraduatesAxios(); 
      setGraduates(graduatesList);  // se actualiza la info despues de cada renderizado y es lo que se pasa a la variable de estado graduates, y eso es lo que mostramos en pantalla
      // react recordara ese efecto cada vez que se actualice el dom 
    }  
    GetInfo();
}, [loading]); // se acciona un use effect cada vez que vea cambios dentro de los corchetes cuadrados de esta linea 
// si no no se recarga 

const deleteGraduate = async (dni) => {
  await DeleteGraduateAxios(dni);
  setLoading(!loading); 
}

const showAlert = () => {alert('Hola More')};

const changeValue = (event) => setgraduateSelected({...graduateSelected, [event.target.name]: event.target.value});
const changeValue1 = (event) => setgraduateCreated({...graduateCreated, [event.target.name]: regexTextName(event.target.value)});
// el onchange cuando nota el nuevo valor en el input (el evento) lo asigna al valor de la etiqueta que tiene ese name 
const changeValueNumber = (event) => setgraduateCreated({...graduateCreated, [event.target.name]: regexsText(event.target.value)});

const selectGraduate = (index, graduate) => {  
  setIndexGraduate(index);
  setgraduateSelected(graduate);  
}

const updateGraduate = async () => {
  await UpdateGraduateAxios(graduateSelected);
  setIndexGraduate(-1);
  setLoading(!loading);  
}

const createGraduate =  async () => {
  if (graduateCreated.first_name !== ''){
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regEmail.test(graduateCreated.email)) {
      await CreateGraduateAxios(graduateCreated);
      setgraduateCreated(new Graduate());
      setLoading(!loading); 
    }else{
      alert('El correo no esta bien escrito idiota');
    }
 }else{
   alert('Si no es capaz de escribir ni el nombre: larguese');
 }
}

const regexsText = (valor) => { 
  const regNumber = /[a-z A-Z]/;
    return valor.replace(regNumber, '');
}

const regexTextName = (valor) => {
  const regText = /\d/;
  return valor.replace(regText,'').toLowerCase();
}

const innerCode = <h1>Texto Quemao</h1>

  return (
  <>
    <h1>Informacion Graduados</h1>

    <h4>Crear Nuevo Graduado</h4>

    <label style={{fontWeight:"bold"}}>Diligencie los siguientes datos: </label><br/><br/>

    <label>Nombre: </label>
    <input name="dni" type="number" placeholder=" Type your DNI here" value={graduateCreated.dni} onChange={changeValueNumber}/><br/>
    <label>Celular: </label>
    <input name="cellphone" type="number" placeholder=" Type your CellPhone here" value={graduateCreated.cellphone} onChange={changeValueNumber}/><br/>
    <label>Primer Nombre: </label>
    <input name="first_name" type="text" placeholder=" Type your First Name" value={graduateCreated.first_name} onChange={changeValue1}/><br/>
    <label>Segundo Nombre: </label>
    <input name="second_name" type="text" placeholder=" Type your Second Name here" value={graduateCreated.second_name} onChange={changeValue1} /><br/>
    <label>Primer Apellido: </label>
    <input name="last_name" type="text" placeholder=" Type your Last-Name here" value={graduateCreated.last_name} onChange={changeValue1} /><br/>
    <label>Segundo Apellido: </label>
    <input name="second_last_name" type="text" placeholder=" Type your Last-Second-Name here" value={graduateCreated.second_last_name} onChange={changeValue1}/><br/>
    <label>Email: </label>
    <input name="email" type="text" placeholder=" Type your email here" value={graduateCreated.email} onChange={changeValue1}/><br/>

    <div style={{cursor:"pointer"}} onClick = {() => {createGraduate()}}>
          <img style={{width:20}} src="https://site-assets.fontawesome.com/releases/v6.1.1/svgs/solid/circle-plus.svg" alt="FuckingAlts"/>
    </div>

    <Welcome rocky="Balboa Pechocho" action={showAlert} textInner ={innerCode} graduates={graduates}>
      {(texto) => <h2>Hola mi amor {texto.first_name} </h2>}
    </Welcome>

    <table>
    <thead> 

      <tr>
        <th>dni</th>
        <th>cellphone</th>
        <th>email</th>
        <th>name</th>
      </tr>
      </thead>

      <tbody>
      {graduates && graduates.map((graduate, index) => 
      
      indexGraduate !== index ? //El key solamente se va a asignar a la etiqueta padre como identificador dentro de un arreglo // Keys help React identify which items have changed, are added, or are removed.  
      <tr key={index}>  
          <td>{graduate.dni}</td>
          <td>{graduate.cellphone}</td>
          <td>{graduate.email}</td>
          <td>{`${graduate.first_name} ${graduate.second_name} ${graduate.last_name} ${graduate.second_last_name}`}</td>
          <td style={{cursor:"pointer"}} onClick = {()=>{deleteGraduate(graduate.dni)}}>
            <img style={{width:20}} src="https://site-assets.fontawesome.com/releases/v6.1.1/svgs/solid/delete-left.svg" alt="Whatever"/>
          </td>
          <td style={{cursor:"pointer"}} onClick = {()=>selectGraduate(index, graduate)}>
            <img style={{width:20}} src="https://site-assets.fontawesome.com/releases/v6.1.1/svgs/solid/pen-to-square.svg" alt="FuckingAlts"/>
          </td>
      </tr>

      : <tr key={index}>
          <td>{graduate.dni}</td>
          <td><input name="cellphone" type="number" placeholder="cellphone" value={graduateSelected.cellphone} onChange={changeValue}/></td>
          <td><input name="email" type="text" placeholder="Email" value={graduateSelected.email} onChange={changeValue}/></td>
          <td>
            <input name="first_name" type="text" placeholder="first_name" value={graduateSelected.first_name} onChange={changeValue}/>
            <input name="second_name" type="text" placeholder="second_name" value={graduateSelected.second_name} onChange={changeValue}/>
            <input name="last_name" type="text" placeholder="last_name" value={graduateSelected.last_name} onChange={changeValue}/>
            <input name="second_last_name" type="text" placeholder="second_last_name" value={graduateSelected.second_last_name} onChange={changeValue}/>
          </td>
          <td style={{cursor:"pointer"}} onClick = {()=>updateGraduate()}>
            <img style={{width:20}} src="https://site-assets.fontawesome.com/releases/v6.1.1/svgs/solid/floppy-disk.svg" alt="FuckingAlts"/>
          </td>
        </tr>
    )}
      </tbody>
    </table>
  </>

  )
}
export default App;


