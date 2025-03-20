import React, { useState } from "react";
import "./App.css";
import { FaCartShopping } from "react-icons/fa6";

const desserts = [
  {
    id: 1,
    name: "Waffle with Berries",
    image: "image-waffle-desktop.jpg",
    price: 4.5,
  },
  {
    id: 2,
    name: "Vanilla Bean",
    image: "image-creme-brulee-desktop.jpg",
    price: 7.5,
  },
  {
    id: 3,
    name: "Macaron Mix",
    image: "image-macaron-desktop.jpg",
    price: 8.5,
  },
  {
    id: 4,
    name: "Classic Tiramisu",
    image: "image-tiramisu-desktop.jpg",
    price: 2.5,
  },
  {
    id: 5,
    name: "Panna Cotta",
    image: "image-panna-cotta-desktop.jpg",
    price: 4.5,
  },
  {
    id: 6,
    name: "Meringue Fla",
    image: "image-meringue-desktop.jpg",
    price: 5.5,
  },
  {
    id: 7,
    name: "Chocolate Cake",
    image: "image-cake-desktop.jpg",
    price: 6.5,
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (dessert) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dessert.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dessert.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...dessert, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // Remove item when quantity reaches 0
    );
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCart([]);
  };

  return (
    <div className="container">
      {/* Desserts Section */}
      <div className="desserts-container">
        <h1 className="title">Desserts</h1>
        <div className="grid">
          {desserts.map((dessert) => (
            <div key={dessert.id} className="grid-item">
              <img
                src={dessert.image}
                alt={dessert.name}
                className={`img ${
                  cart.some((item) => item.id === dessert.id) ? "selected" : ""
                }`}
              />
              <h3 className="name-dessert">{dessert.name}</h3>
              {dessert.price}

              <button
                className="add-cart"
                onClick={() => handleAddToCart(dessert)}
              >
                <FaCartShopping className="icon" />
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Cart Section */}
      <div className="cart-container">
        <h2>
          Your Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} × {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
              <button
                className="decrease-quantity"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                -
              </button>
              <button
                className="increase-quantity"
                onClick={() => handleAddToCart(item)}
              >
                +
              </button>
            </li>
          ))}
        </ul>

        {cart.length > 0 && (
          <button className="order" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Order Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button className="close-modal" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
