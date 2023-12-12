import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavbarBrand, NavLink } from 'reactstrap';
import logoX from './photosG/logoX.png'; 

class AppNav extends Component {
  state = {};

  render() {
    return (
      <div>
        <Navbar style={{ backgroundColor: 'black' }} dark expand="md">
          <NavbarBrand href="/" style={{ color: '#dfe8e7' ,fontSize: '32px' ,fontWeight: 'bold',marginBottom: '4px'}}>
          <img
  src={logoX} // Asegúrate de proporcionar la ruta correcta a tu imagen
  alt="logoX"
  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
/>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/" style={{ color: '#bcbcbc' }}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/categories" style={{ color: '#bcbcbc' }}>
                Categorias
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/expenses" style={{ color: '#bcbcbc' }}>
                Mis Gastos
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default AppNav;
