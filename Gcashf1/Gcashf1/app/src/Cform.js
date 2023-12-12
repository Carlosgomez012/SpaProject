import React, { Component } from 'react';
import { Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'; // libreria para el tag, enviar al cliente a una ruta 




class Cform extends Component {
    state = {  } 
    render() { 
        return (
            <Container style={{ height:'260px', width: '350px', margin:'auto', padding: '10px', border: '3px solid grey', borderRadius: '10px',backgroundColor:'black' }} >
      <Form  style={{ margin: '10px'  }}  onSubmit={this.handleSubmit}>
      
      <FormGroup>
      <Label for="category"  style ={{color:'#227c67',fontWeight: '700'}} >Categoria</Label>
     <Input  type="description" name="category" id="category" onChange={this.handleChange} autoComplete="name"
      style={{ margin: 'auto',backgroundColor:'black',borderTop:'none',borderLeft:'none',borderRight:'none',borderBottom:'2px solid #bcbcbc' }} />                    
     </FormGroup>  

   <FormGroup style={{ width: '300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
    <Button color="primary" type="submit" style={{ flex: '1', width: '40px', height: '30px', marginRight: '5px', backgroundColor: '#227c67',borderColor: '#227c67', alignItems: 'center',lineHeight: '5px', color: 'white !important',}}> <FontAwesomeIcon icon= {faCheck} />
    </Button>
    <Button color="secondary" tag={Link} to="/" style={{ flex: '1', width: '40px', height: '30px', marginLeft: '5px',backgroundColor:'#bcbcbc',borderColor: '#bcbcbc', alignItems: 'center',lineHeight: '15px'}}><FontAwesomeIcon icon={faTrash} />
    </Button>
    </FormGroup> 
    
     </Form>
      </Container>
        );
    }
}
 
export default Cform;