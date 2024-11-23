import React, { Component } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import './CarritoProductos.css';

class CarritoProductos extends Component {
    state = {
        productos: [],
        loading: true,
        carro: [],
    };

    componentDidMount() {
        this.CarritoProductos();
    }

    // Cargar productos desde Firestore
    CarritoProductos = async () => {
        try {
            const productosCollection = collection(db, 'productos');
            const productSnapshot = await getDocs(productosCollection);
            const ListaProductos = productSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            this.setState({ productos: ListaProductos, loading: false });
        } catch (error) {
            console.error('Error al encontrar productos: ', error);
            this.setState({ loading: false });
        }
    };

    // Agregar producto al carrito
    addToCart = (producto) => {
        const productoEnCarro = this.state.carro.find(item => item.id === producto.id);

        if (productoEnCarro) {
            // Si el producto ya está en el carrito y hay stock disponible, aumentamos la cantidad
            if (productoEnCarro.quantity < producto.quantity) {
                const ActualizarCarro = this.state.carro.map(item =>
                    item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                this.setState({ carro: ActualizarCarro });
            }
        } else {
            // Si el producto no está en el carrito, lo agregamos con cantidad 1
            this.setState(prevState => ({
                carro: [...prevState.carro, { ...producto, quantity: 1 }]
            }));
        }
    };

    // Eliminar producto del carrito
    removeFromCarro = (Idproducto) => {
        const productoExistente = this.state.carro.find(item => item.id === Idproducto);
        if (productoExistente) {
            const ActualizarCarro = this.state.carro.filter(item => item.id !== Idproducto);
            this.setState({ carro: ActualizarCarro });
        }
    };

    // Calcular el total del carrito
    calcularTotal = () => {
        const total = this.state.carro.reduce((total, item) => total + item.price * item.quantity, 0);
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'CLP' }).format(total);  
    };

    render() {
        const { productos, loading, carro } = this.state;

        if (loading) {
            return <p>Cargando productos...</p>;
        }

        return (
            <div className="carro-productos">
                <div className="lista-productos">
                    <h2>Productos Disponibles</h2>
                    <ul>
                        {productos.map(producto => (
                            <li key={producto.id} className="li.productos">
                                <div className="li.productos2">
                                    <img className="img-productos" src={producto.photo} alt={producto.name} width="100" />
                                    <h3>{producto.name}</h3>
                                    <p className="p-productos">${producto.price}</p>
                                    <p className="p-productos">Disponible: {producto.quantity}</p>
                                    <button 
                                        onClick={() => this.addToCart(producto)}
                                        disabled={producto.quantity === 0 || this.state.carro.some(item => item.id === producto.id && item.quantity >= producto.quantity)}
                                    >
                                        {this.state.carro.some(item => item.id === producto.id && item.quantity >= producto.quantity) 
                                          ? 'Agotado en carrito' 
                                          : 'Agregar al carrito'}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lista-carrito">
                    <h2>Carrito de Compras</h2>
                    <h3>Total: ${this.calcularTotal()}</h3>
                    <ul>
                        {carro.map(item => (
                            <li key={item.id} className="items-carro">
                                <img src={item.photo} alt={item.name} width="50" />
                                <p>{item.name}</p>
                                <p>${item.price * item.quantity} x {item.quantity}</p>
                                <button onClick={() => this.removeFromCarro(item.id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>

                    
                </div>
            </div>
        );
    }
}

export default CarritoProductos;
