import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
    };

    return (
        <div>
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' }}>
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <h3>Paradise Nursery</h3>
                        <i>Where Green Meets Serenity</i>
                    </a>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#" onClick={() => setShowCart(false)} style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>Plants</a>
                    <a href="#" onClick={() => setShowCart(true)} style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>
                        🛒 Cart ({totalQuantity})
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2>{category.category}</h2>
                            <div className="plant-items">
                                {category.plants.map((plant, i) => (
                                    <div key={i} className="plant-card">
                                        <h3>{plant.name}</h3>
                                        <img src={plant.image} alt={plant.name} />
                                        <p>{plant.description}</p>
                                        <p><strong>Cost:</strong> {plant.cost}</p>
                                        <button 
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]} 
                                            style={{ backgroundColor: addedToCart[plant.name] ? 'gray' : 'green' }}
                                        >
                                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem />
            )}
        </div>
    );
}

export default ProductList;
