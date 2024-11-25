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
// Método para manejar el cambio de los valores en los inputs
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

// Método para manejar el envío del formulario (cuando el usuario agrega un producto)
    handleSubmit = (e) => {
        e.preventDefault();
        const {name, price, quantity, photo} = this.state;
// Referencia a la colección 'productos' en la base de datos de Firebase
        const productosCollection = collection(db,'productos');
        addDoc(productosCollection, {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            photo,
        })
 // Si la union entre la base de datos y el programa es exitosa
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
 // Si el producto se agrega esperamos 5 segundos
            setTimeout(() => {
                this.setState({ Message: '', addedProducto: null});
            },5000);
        })
// En caso de que el producto no se pueda agregar a la base de datos.
        .catch((error) => {
            console.error('Error al agregar producto: ', error);
            this.setState({
                message: 'Error al agregar producto',
            });
// Tiempo que se muestra el mensaje de error 3seg
            setTimeout(() => {
                this.setState({ message: ''});
            }, 3000);
        });
    };
// Render interfaz de usuario, formulario para el ingreso de productos a la base de datos.
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
{/* Mensaje que muestra si el prodocto fue agregado con exito */}
        {message && (
          <p className={`message ${message === 'Producto agregado con éxito' ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

{/* Muesta el producto agregado en la base de datos firebase */}
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