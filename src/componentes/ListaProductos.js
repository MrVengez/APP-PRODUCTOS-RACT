import React, { Component } from 'react';
import { db, collection, getDocs } from './firebase';

class ListaProductos extends Component {
    state = {
        productos:[],
    };
componentDidMount(){
    this.EncontrarProductos();
}

// Metodo para obtiene los productos de la base de datos
EncontrarProductos = async () => {
    const productosCollection = collection(db, 'productos');
    const querySnapshot = await getDocs(productosCollection);

    const productos = querySnapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data(),
    }));

    this.setState({productos});
};

// Interfaz para el usuario, donde podra ver el listado de los productos
render(){
    const { productos } = this.state;
 
    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {productos.map((productos) => (
                    <li key={productos.id}>
                        <p>{productos.name}</p>
                        <p>Precio: ${productos.price}</p>
                        <p>Cantidad: ${productos.quantity}</p>
                        {productos.photo && <img src={productos.photo} alt={productos.name} width="100"/>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
}

export default ListaProductos;