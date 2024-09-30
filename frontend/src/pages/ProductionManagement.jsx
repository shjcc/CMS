import React, { useState } from 'react';

const recipes = {
    cake: { flour: 500, eggs: 2 }, // 1 cake = 500g flour, 2 eggs
    sandwich: { bread: 2, ham: 50, cheese: 20 }, // 1 sandwich = 2 slices of bread, 50g ham, 20g cheese
};

const ProductionManagement = () => {
    const [task, setTask] = useState({ product: 'cake', quantity: 1, date: '', time: '' });
    const [ingredients, setIngredients] = useState({});
    const [confirmation, setConfirmation] = useState('');
    const [totalProducts, setTotalProducts] = useState(0); // Track total number of products scheduled

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedTask = { ...task, [name]: value };
        setTask(updatedTask);
        
        // Automatically update the ingredient list when quantity or product changes
        if (name === 'product' || name === 'quantity') {
            calculateIngredients(updatedTask);
        }
    };

    const calculateIngredients = (currentTask) => {
        const selectedRecipe = recipes[currentTask.product];
        const quantity = parseInt(currentTask.quantity, 10) || 0;
        const calculatedIngredients = {};

        for (let ingredient in selectedRecipe) {
            calculatedIngredients[ingredient] = selectedRecipe[ingredient] * quantity;
        }

        setIngredients(calculatedIngredients);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form inputs
        if (task.quantity <= 0 || !task.date || !task.time) {
            alert('Please enter a valid quantity, date, and time.');
            return;
        }

        // Show confirmation message and update the total number of products
        setConfirmation(`Scheduled production of ${task.quantity} ${task.product}(s) on ${task.date} at ${task.time}.`);
        setTotalProducts(totalProducts + parseInt(task.quantity, 10)); // Increment the total product count
    };

    const handleReset = () => {
        // Reset form inputs and state variables
        setTask({ product: 'cake', quantity: 1, date: '', time: '' });
        setIngredients({});
        setConfirmation('');
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
                <button type="button" onClick={handleReset}>Reset</button>
            </form>

            {/* Display the list of required ingredients */}
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

            {/* Show confirmation message if set */}
            {confirmation && <div style={{ marginTop: '20px', color: 'green' }}>{confirmation}</div>}

            {/* Display total products scheduled */}
            <div style={{ marginTop: '20px' }}>
                <strong>Total Products Scheduled for Production: {totalProducts}</strong>
            </div>
        </div>
    );
};

export default ProductionManagement;
