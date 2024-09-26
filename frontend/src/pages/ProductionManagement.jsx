import React, { useState } from 'react';

// Define recipes for products
const recipes = {
    cake: { flour: 500, eggs: 2 }, // 1 cake = 500g flour, 2 eggs
    sandwich: { bread: 2, cheese: 1 } // 1 sandwich = 2 slices of bread, 1 slice of cheese
};

const ProductionManagement = () => {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [schedule, setSchedule] = useState('');
    const [tasks, setTasks] = useState([]);
    const [ingredients, setIngredients] = useState({});

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!product || quantity <= 0 || !schedule) {
            alert('Please fill out all fields.');
            return;
        }

        // Calculate the required ingredients based on the product and quantity
        const requiredIngredients = calculateIngredients(product, quantity);

        // Add the new task to the tasks array
        const newTask = { product, quantity, schedule, ingredients: requiredIngredients };
        setTasks([...tasks, newTask]);

        // Reset form fields
        setProduct('');
        setQuantity(0);
        setSchedule('');
        setIngredients(requiredIngredients);
    };

    // Function to calculate required ingredients
    const calculateIngredients = (product, quantity) => {
        const recipe = recipes[product];
        const required = {};
        if (recipe) {
            for (const ingredient in recipe) {
                required[ingredient] = recipe[ingredient] * quantity;
            }
        }
        return required;
    };

    return (
        <div>
            <h1>Production Management</h1>
            
            {/* Production Task Form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product:</label>
                    <select value={product} onChange={(e) => setProduct(e.target.value)}>
                        <option value="">Select Product</option>
                        <option value="cake">Cake</option>
                        <option value="sandwich">Sandwich</option>
                    </select>
                </div>

                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min="1"
                    />
                </div>

                <div>
                    <label>Schedule Date & Time:</label>
                    <input
                        type="datetime-local"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                    />
                </div>

                <button type="submit">Add Task</button>
            </form>

            {/* Display Scheduled Tasks */}
            <h2>Scheduled Production Tasks</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task.quantity} {task.product}(s) scheduled for {new Date(task.schedule).toLocaleString()}
                        <ul>
                            {Object.keys(task.ingredients).map((ingredient, i) => (
                                <li key={i}>{task.ingredients[ingredient]}g of {ingredient}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductionManagement;
