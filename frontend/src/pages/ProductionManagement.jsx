import React, { useState } from 'react';

const recipes = {
    cake: { flour: 500, eggs: 2 }, // 1 cake = 500g flour, 2 eggs
    sandwich: { bread: 2, ham: 50, cheese: 20 }, // 1 sandwich = 2 slices of bread, 50g ham, 20g cheese
};

const ProductionManagement = () => {
    const [task, setTask] = useState({ product: 'cake', quantity: 1, date: '', time: '' });
    const [ingredients, setIngredients] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const calculateIngredients = () => {
        const selectedRecipe = recipes[task.product];
        const quantity = parseInt(task.quantity, 10);
        const calculatedIngredients = {};

        for (let ingredient in selectedRecipe) {
            calculatedIngredients[ingredient] = selectedRecipe[ingredient] * quantity;
        }

        setIngredients(calculatedIngredients);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateIngredients();
        // Additional logic for submitting the task can be added here.
    };

    return (
        <div>
            <h2>Production Management</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product:</label>
                    <select name="product" value={task.product} onChange={handleInputChange}>
                        <option value="cake">Cake</option>
                        <option value="sandwich">Sandwich</option>
                    </select>
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={task.quantity}
                        onChange={handleInputChange}
                        min="1"
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={task.date} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Time:</label>
                    <input type="time" name="time" value={task.time} onChange={handleInputChange} />
                </div>
                <button type="submit">Schedule Production</button>
            </form>

            {Object.keys(ingredients).length > 0 && (
                <div>
                    <h3>Required Ingredients for {task.quantity} {task.product}(s):</h3>
                    <ul>
                        {Object.entries(ingredients).map(([ingredient, amount]) => (
                            <li key={ingredient}>
                                {ingredient}: {amount}g
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductionManagement;
