import React, { Component } from 'react';// Estoy importanto basicamente react y el componente
import AppNav  from './AppNav';
import { Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import './App.css';
import {Link} from 'react-router-dom'; // libreria para el tag, enviar al cliente a una ruta 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


class Category extends Component {


  //7) un emptyitem: que basicamente es la estructura del paquete que tenemos que  enviar a springboot,al endpoint
  //y vamos a popular el emptyitem  con el form que tenemos

  emptyItem = {    
     name:'travel',
     emoji:'po'
  }

  //9) crear constructor con el state y props(argumentos que enviamos al constructor), usted sabe que no puede 
  //cambiar eso,ademas el contructor es el primer metodo que se llama asi que es un gran lugar para iniciar
  //nuestro estado


  
  constructor(props){
    super(props) //10) llamamos al contructor de la super clase, y pasamos los argumentos a este constructor tambien
   // la superclase es componente, si quieres toma ventaja de todas las caracteristicas de componente
   //necesitas inicializar el componente y lo hacemos con la data que enviamos 

    // 1) definir un estado inicial  para el componente asi que tan pronto como se carge el componente en el navegador, 
   //tendra una variable de que esta cargando, y un vector de categorias vacio ya que no hay nada 
    this.state = {   isLoading: true,//mientras carga en el dom y espera la respuesta de la api
      Categories: [],     
      item : this.emptyItem   //8 )agregar empytime al estado, ya que sera algo que cambia y vamos a popular
    
      
    }

    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChange= this.handleChange.bind(this);

  }

   
  
  
    //2) Hacer la llamada asincronica para tan pronto como se monte , llame a la ruta
    // api/categories  donde esta ruta tiene una lista de todas las categorias en el back , tan pronto
    //como tenga respuesta del back el estado cambiara a falso,pero la respuesta puede ser un json vacio
    //se le conoce como "llamada al api"

      async componentDidMount(){
        const response=await fetch('/api/categories'); // aca hace la peticion asincronica  htttp  y guarda la respuesta en una variable de tipo response
        const body = await response.json(); // aca response tiene un metodo para obtener los datos que tiene en formato json y se guardan en una constante 
        this.setState({Categories : body , isLoading: false}); // ¡IMPORTANTE!, solo podemos usar el set , para cambiar el estado 
        // llenamos a categories con lo que tiene la constante body, que son elementos en formato json, (una lista en este caso en formato json)
        //y cambiamos el loading a falso,ya que tenemos categorias ahora (que pueden ser nulas).



    }

    //11) funcion para eliminar
    async remove(id){ // enviamos el id como parametro
      await fetch(`/api/category/${id}` , { // hacemos un request asincronico a esta ruta del metodo post en sprinboot
        method: 'DELETE' , //necesitamos enviar mas data en nuestra petición tal como: el metodo al que se va a llamar.
        //Necesitamos hacerle saber al endpoint  que el metodo  http delete es el que nuestra funcion esta intereseada 
        headers : { //vamos a enviar varios headers como en postman
          'Accept' : 'application/json', // aqui decimos que nuestra peticion que vamos a iniciar sera un JSON command
          'Content-Type' : 'application/json'// nuestro contenido es de tipo json
        }
           //creamos otra funcion
      }).then(() => {// creamos una variable para actualizar nuestras categorias
        let updatedCategories = [...this.state.Categories].filter(i => i.id !== id);  //(i=> esta es la funcion del id) //this.state.Categories es el arreglo original de categorías.
//[...this.state.Categories] crea una copia de ese arreglo.( que es una lista en formato json)
//.filter(i => i.id !== id) excluye del arreglo copiado aquellos elementos cuyo id es igual al id 
//proporcionado, dejando solo las categorías que no coinciden con el id. 
        this.setState({Categories : updatedCategories});// y finalmente necesitamos update nuestro estado ya que hemos eliminado 
      }); // actualizamos el estado excluyendo las categoria que eliminamos

  }


 


  //12)funcion para enviar el form al back
  async handleSubmit(event){// llamada asincrona no queremos esperar,vamos a enviar data el backend
    //en JS se basa en event-driven, entonces por eso(event)
    //Cuando iniciamos esta funcion
     
    const item = this.state.item;
  

    await fetch(`/api/category`, {
      method : 'POST',
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(item),// data que estamos teniendo en JS la enviamos al back en forma de Json
    });
  
    
    event.preventDefault();//previene que el form se envie si hemos dado enter a un input, solo se envia si se da
    //click en el boton, no antes en algun input
    this.props.history.push("/categories");// refrescar nuestra pagina de expenses de react
  }

  //13) funcion para actualizar los datos en nuestro estado que vamos a enviar al back
 

  handleChange(event){
    const target= event.target;
    const value= target.value;
    const name = target.name;
    let item={...this.state.item};
    item[name] = value;
    this.setState({item});
    console.log(item);
  }
  
  
  
  
  

   



   
        


  render() {// componente que convierte el jsx a un objeto de tipo html.

  //3) Crear en el render una variable con dos atributos del estado, categorias e is loading
  const { Categories, isLoading} = this.state; 

   
  

  //4) retornar solo el formulario si ya tuvo respuesta del back y no hay categorias en el json
    if (isLoading) return( <div> Esta cargando
      </div>)
    

    
// 5) creamos una variable contante que guardara todo los td que se haran, por cada categoria sea hara un tr
    // y un td con el nombre de la categoria  // vamos a retornar este cuadro pero tambien el formulario 
    //y usamos rows en e cuerpo de la tabla
    let rowsC = Categories.map(category =>    
      <tr key={category.id}>
        <td style={{ color: 'white', fontSize: '22px' }}>        
        {category.emoji} {category.name}
          </td>
        
        <td>
        <Button size="sm" style={{ backgroundColor: '#bcbcbc', color: 'white', borderColor:'#bcbcbc'}} onClick={() => this.remove(category.id)}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
    </td>
      </tr>
    );
  

  
   
    
      

   //6) retornar algo si ya tuvo respues del back y tiene categorias en el json 
 // y aqui retornamos el nav, el titulo,nuestro componente y la tabla

  return (
    <div>
      <AppNav />
      <br></br>
      <h2 style={{ color: 'black',textAlign:'center',marginBottom:'40px' }}>Agregar Categorias</h2>
    
      <Container style={{ height:'260px', width: '350px', margin:'auto', padding: '10px', border: '3px solid grey', borderRadius: '10px',backgroundColor:'black' }} >
      <Form  style={{ margin: '10px'  }}  onSubmit={this.handleSubmit}>
      
      <FormGroup>
      <Label for="name"  style ={{color:'#227c67',fontWeight: '700'}} >Categoria</Label>
     <Input  type="text" name="name" id="name" onChange={this.handleChange} autoComplete="name"
      style={{ margin: 'auto',backgroundColor:'black',borderTop:'none',borderLeft:'none',borderRight:'none',borderBottom:'2px solid #bcbcbc' }} />                    
     </FormGroup>  
     <FormGroup>
  <Label for="emoji" style={{ color: '#227c67', fontWeight: '700' }}>Emoji</Label>
  <Input
    type="text"
    name="emoji"
    id="emoji"
    onChange={this.handleChange}
    autoComplete="off"
    style={{
      margin: 'auto',
      backgroundColor: 'black',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '2px solid #bcbcbc'
    }}
  />
</FormGroup>

   <FormGroup style={{ width: '300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
    <Button color="primary" type="submit" style={{ flex: '1', width: '40px', height: '30px', marginRight: '5px', backgroundColor: '#227c67',borderColor: '#227c67', alignItems: 'center',lineHeight: '5px', color: 'white !important',}}> <FontAwesomeIcon icon= {faCheck} />
    </Button>
    <Button color="secondary" tag={Link} to="/" style={{ flex: '1', width: '40px', height: '30px', marginLeft: '5px',backgroundColor:'#bcbcbc',borderColor: '#bcbcbc', alignItems: 'center',lineHeight: '15px'}}><FontAwesomeIcon icon={faTrash} />
    </Button>
    </FormGroup> 
    
     </Form>
      </Container>   
     

      <Container style={{ marginTop: '20px', textAlign: 'center' }}>
        <br></br>
        <Table className="mt-4" style={{ width: '20%', margin: '0 auto' }}>         
          <thead style={{ backgroundColor: 'black', color: '#227c67',fontSize: '32px' }}>
            <tr>
              <th >Categorías</th>             
              <th >Acción</th>

            </tr>
          </thead>
          <tbody>
            {rowsC}
            </tbody>
        </Table>
      </Container>      
    </div>

  )
  };

} 
  

 
export default Category;
//Estructura de un componente React , extends porque necesitamos
//heredar todos los comportamientos de un componente
// Los componentes tienen dos partes principales:
//1.Stage 