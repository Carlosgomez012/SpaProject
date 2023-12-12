import React, { Component } from 'react';
import AppNav from './AppNav';
import gcashpImage from './photosG/gcashp.jpeg';  
import portada from './photosG/portada.jpeg';  
import pop from './photosG/bestone.png'; 

class Home extends Component {
    state = {};

    render() {
        return (
            <div>
                <AppNav />
                <img
  src={pop} // Asegúrate de proporcionar la ruta correcta a tu imagen
  alt="pop"
  style={{ width: '1305px', height: '560px', objectFit: 'cover' ,marginTop:'1px' }}
/>
                
            </div>
        );
    }
}

export default Home;
