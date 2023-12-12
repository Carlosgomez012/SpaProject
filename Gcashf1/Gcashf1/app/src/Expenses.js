import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


class Expenses extends Component {


  // {
  //   "id": 100,
  //   "expensedate": "2019-06-16T17:00:00Z",
  //   "description": "New York Business Trip",
  //   "location": "New York",
  //   "category": {
  //   "id": 1,
  //   "name": "Travel"
  //   }
  //   },
 
  emptyItem = {
    description: '',
    expensedate: new Date(),
    //id: 104, no tenemos que enviarle ya que es auto generado 
    location: '',
    amount: null, // o cualquier otro valor que prefieras
    category: {id:'1', name:'Travel' , emoji:'po' }
  }
 


   
    constructor(props){
      super(props)


      this.state = {
        isLoading :false,
        Categories:[],
        Expenses : [],//
        date :new Date(),
        item : this.emptyItem
       }


       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);
       this.handleDateChange= this.handleDateChange.bind(this);


    }


    async handleSubmit(event) {
      const item = this.state.item;
    
      await fetch(`/api/expenses`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
    
      event.preventDefault();
      this.props.history.push("/expenses");
    }


    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
    
      let item = { ...this.state.item };
    
      // Si el nombre es "category", busca la categoría correspondiente y configúrala en el estado del item.
      if (name === "category") {
        const selectedCategory = this.state.Categories.find(category => category.id === parseInt(value));
        item.category = selectedCategory;
      } else {
        // Si no es la categoría, simplemente actualiza el valor en el estado del item.
        item[name] = value;
      }
    
      this.setState({ item });
    }
    
   
   


    handleDateChange(date){
      let item={...this.state.item};
      item.expensedate= date;
      this.setState({item});
   
    }












    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }


        }).then(() => {
          let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);//
          this.setState({Expenses : updatedExpenses});
        });


    }




    async componentDidMount() {
 
     


        const response= await fetch('/api/categories');
        const body= await response.json();
        this.setState({Categories : body , isLoading :false});




        const responseExp= await fetch('/api/expenses');
        const bodyExp = await responseExp.json();
        this.setState({Expenses : bodyExp , isLoading :false});
        console.log(bodyExp);


    }










    render() {
        const title =<h3>Agregar Gasto</h3>;
        const {Categories} =this.state;
        const {Expenses,isLoading} = this.state;// aui
       


        if (isLoading)
            return(<div>Loading....</div>)
       




        let optionList  =
                Categories.map( (category) =>
                    <option value={category.id} key={category.id}>
                               {category.emoji} {category.name}
                    </option>
                )
       
        let rows=
            Expenses.map( expense =>
              <tr key={expense.id}>
                <td className="grey-text">  {expense.category.emoji} {expense.category.name }</td>
                <td className="grey-text">{expense.description}</td>
                 <td className="grey-text">{expense.location}</td>
                <td className="grey-text"><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                <td className="grey-text">{expense.monto}</td>                
                <td className="grey-text">
  <Button size="sm" style={{ backgroundColor: '#bcbcbc', color: 'white', borderColor:'#bcbcbc'}} onClick={() => this.remove(expense.id)}>
    <FontAwesomeIcon icon={faTrash} />
  </Button>
</td>
              </tr> // funcion que mapea


              )




           
       


        return (
            <div>
                <AppNav/>
                <br></br>
                <br></br>
                {title}
                <br></br>
                <br></br>
                
                <Container>
                <div style={{ height:'500px', width: '350px', margin: '0 auto', padding: '10px', border: '3px solid grey', borderRadius: '10px',backgroundColor:'black'  }}>
                 
        <Form onSubmit={this.handleSubmit}>
        <FormGroup style={{ width: '300px', margin: '0 auto' }}>
            <Label for="description" style={{ color: '#227c67',fontWeight: 700 }}>Descripción</Label>
           
            <Input
  type="description"
  name="description"
  id="description"
  style={{
    backgroundColor: 'black',
    color: 'white',
    borderBottom: '2px solid #bcbcbc',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    width: '100%',
  }}
  onChange={this.handleChange}
  autoComplete="name"
/>




        </FormGroup>


        <FormGroup style={{ width: '300px', margin: '0 auto' }}>
            <Label for="category" style={{ color: '#227c67',fontWeight: 700  }}>Categoria</Label>
            <select
  className="form-control"
  style={{
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid white',
    borderBottom: '2px solid #bcbcbc',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  }}
  onChange={this.handleChange}
  name="category"  // Asegúrate de que esta línea esté presente
>
  {optionList}
</select>


        </FormGroup>


        <FormGroup style={{ width: '300px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
    <Label for="city" style={{ marginBottom: '5px',color: '#227c67',fontWeight: 700  }}>Fecha</Label>
    <DatePicker
        selected={this.state.item.expensedate}
        onChange={this.handleDateChange}
        wrapperClassName="datepicker-wrapper"  // Nombre de clase personalizado
        className="form-control custom-datepicker"  // Se puede añadir  la clase de Bootstrap para estilos adicionales
        style={{ width: '100%',
        backgroundColor: 'black',
        color: 'white',
        border: '1px solid white',}}  // Establece el ancho directamente
    />
</FormGroup>






        <FormGroup style={{ width: '300px', margin: '0 auto' }}>
            <Label for="location" style={{ color: '#227c67' ,fontWeight: 700 }}>Localización</Label>
            <Input type="text" name="location" id="location" style={{
    backgroundColor: 'black',
    color: 'white',
    borderBottom: '2px solid #bcbcbc',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    width: '100%',
  }}  onChange={this.handleChange}/>
        </FormGroup>


        <FormGroup style={{ width: '300px', margin: '0 auto' }}>
            <Label for="amount" style={{ color: '#227c67',fontWeight: 700  }} >Monto</Label>
            <Input type="number" name="monto" id="amount"  style={{
    backgroundColor: 'black',
    color: 'white',
    borderBottom: '2px solid #bcbcbc',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    width: '100%',
  }}  onChange={this.handleChange} />
        </FormGroup>


        <FormGroup style={{ width: '300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
    <Button color="primary" type="submit" style={{ flex: '1', width: '40px', height: '30px', marginRight: '5px', backgroundColor: '#227c67',borderColor: '#227c67', alignItems: 'center',lineHeight: '5px', color: 'white !important',}}> <FontAwesomeIcon icon= {faCheck} />
</Button>
    <Button color="secondary" tag={Link} to="/" style={{ flex: '1', width: '40px', height: '30px', marginLeft: '5px',backgroundColor:'#bcbcbc',borderColor: '#bcbcbc', alignItems: 'center',lineHeight: '15px'}}><FontAwesomeIcon icon={faTrash} />
  </Button>
</FormGroup>


               </Form>    
               </div>              
                </Container>
                <br></br>
                <br></br>
                <br></br>
                
                
             


          {''}
         
              <Container>
              <div style={{ borderTop:'200px' }}>  
              <div  style={{alignItems:'center'}}>
          <h3>Lista de Gastos</h3>
          
          </div>  
          <br></br>  
          <br></br>
                   
                <Table className="mt-4" style={{ backgroundColor: 'black', color: '#227c67' }}>
                <thead>
                  <tr>
                    <th width="20%">Categoria</th>
                    <th width="20%">Descripción</th>
                    <th> Localización</th>
                    <th> Fecha</th>
                    <th> Monto</th>
                    <th width="10%">Acción</th>
                  </tr>
                </thead>
                <tbody>
                   {rows}
                </tbody>


                </Table>
                </div>  
              </Container>


         


        </div>


        );
    }
}
 
export default Expenses;