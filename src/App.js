import React, { Component } from 'react';
import Productos from './componentes/Productos';
import CarritoProductos from './componentes/CarritoProductos';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 


class App extends Component {
  state = {
    selectedComponent: 'CarritoProductos', 
  };

  handleSelectComponent = (component) => {
    this.setState({ selectedComponent: component });
  };

  render() {
    const { selectedComponent } = this.state;
    return (
      <div className="app-container">
        <div className="sidebar">
          <h1>MENU PRODUCTOS</h1>
          <div
            className={`sidebar-item ${selectedComponent === 'CarritoProductos' ? 'active' : ''}`}
            onClick={() => this.handleSelectComponent('CarritoProductos')}
          >
            Ver productos para agregar al carrito
          </div>
          <div
            className={`sidebar-item ${selectedComponent === 'Productos' ? 'active' : ''}`}
            onClick={() => this.handleSelectComponent('Productos')}
          >
            Agregar productos a la base de datos
            
            
          </div>
        </div>

        <div className="main-content">
          {selectedComponent === 'CarritoProductos' ? <CarritoProductos /> : <Productos />}
        </div>
      </div>
    );
  }
}

export default App;



