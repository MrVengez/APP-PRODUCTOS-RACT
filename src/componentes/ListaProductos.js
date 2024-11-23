import React, { Component } from 'react';
import { db, collection, getDocs } from './firebase';

class ListaProductos extends Component {
    state = {
        productos:[],
    };
componentDidMount(){
    this.EncontrarProductos();
}

EncontrarProductos = async () => {
    const productosCollection = collection(db, 'productos');
    const querySnapshot = await getDocs(productosCollection);

    const productos = querySnapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data(),
    }));

    this.setState({productos});
};

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