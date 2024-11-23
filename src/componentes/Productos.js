import React, { Component } from 'react';
import { db, collection, addDoc } from '../firebase';

class Producto extends Component {
    state = {
      name: '',
      price: '',
      quantity: '',
      photo: '',
      message: '',
      addedProduct: null,
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

    handleSubmit = (e) => {
        e.preventDefault();
        const {name, price, quantity, photo} = this.state;

        const productosCollection = collection(db,'productos');
        addDoc(productosCollection, {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            photo,
        })

        .then((docRef) => {
            console.log('Producto agregado con exito');
            
            this.setState({
                message: 'Producto agregado con exito',
                addedProducto: {
                    name,
                    price: parseFloat(price),
                    quantity: parseInt(quantity, 10),
                    photo,
                    id: docRef.id,
                },
                name:'',
                price:'',
                quantity:'',
                photo:'',
            });

            setTimeout(() => {
                this.setState({ Message: '', addedProducto: null});
            },5000);
        })

        .catch((error) => {
            console.error('Error al agregar producto: ', error);
            this.setState({
                message: 'Error al agregar producto',
            });
            setTimeout(() => {
                this.setState({ message: ''});
            }, 3000);
        });
    };

    render() {
        const {name,price, quantity, photo, message, addedProducto} = this.state;

        return(
            <div>
                <h2>Agregar Producto</h2>
                <form onSubmit={this.handleSubmit}>
                <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Nombre del producto"
            required
          />
          <input
            type="number"
            name="price"
            value={price}
            onChange={this.handleInputChange}
            placeholder="Precio"
            required
          />
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={this.handleInputChange}
            placeholder="Cantidad"
            required
          />
          <input
            type="text"
            name="photo"
            value={photo}
            onChange={this.handleInputChange}
            placeholder="URL de la foto"
          />
          <button type="submit">Agregar Producto</button>
        </form>

        {message && (
          <p className={`message ${message === 'Producto agregado con éxito' ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        {addedProducto && (
          <div className="added-product">
            <h3>Producto Agregado</h3>
            <img src={addedProducto.photo} alt={addedProducto.name} width="100" />
            <p><strong>Nombre:</strong> {addedProducto.name}</p>
            <p><strong>Precio:</strong> ${addedProducto.price}</p>
            <p><strong>Cantidad:</strong> {addedProducto.quantity}</p>
            <p><strong>ID:</strong> {addedProducto.id}</p>
          </div>
        )}                
        </div>
        );
    }
}

export default Producto;