// Import packages, initialize an express app, and define the port you will use
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Restaurant API server running at http://localhost:${port}`);
});


// Data for the server
const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Beef patty with lettuce, tomato, and cheese on a sesame seed bun",
    price: 12.99,
    category: "entree",
    ingredients: ["beef", "lettuce", "tomato", "cheese", "bun"],
    available: true
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    description: "Grilled chicken breast over romaine lettuce with parmesan and croutons",
    price: 11.50,
    category: "entree",
    ingredients: ["chicken", "romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    available: true
  },
  {
    id: 3,
    name: "Mozzarella Sticks",
    description: "Crispy breaded mozzarella served with marinara sauce",
    price: 8.99,
    category: "appetizer",
    ingredients: ["mozzarella cheese", "breadcrumbs", "marinara sauce"],
    available: true
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 7.99,
    category: "dessert",
    ingredients: ["chocolate", "flour", "eggs", "butter", "vanilla ice cream"],
    available: true
  },
  {
    id: 5,
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh lemons and mint",
    price: 3.99,
    category: "beverage",
    ingredients: ["lemons", "sugar", "water", "mint"],
    available: true
  },
  {
    id: 6,
    name: "Fish and Chips",
    description: "Beer-battered cod with seasoned fries and coleslaw",
    price: 14.99,
    category: "entree",
    ingredients: ["cod", "beer batter", "potatoes", "coleslaw", "tartar sauce"],
    available: false
  }
];

// Define routes and implement middleware here
// GET all menu items/specific menu items
app.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to the Restaurant API", 
        endpoints: { 
            "GET /menu": "Get all menu items", 
            "GET /menu/:id": "Get a specific menu item by ID",
            "POST /menu": "Add a new menu item",
            "PUT /menu/:id": "Update an existing menu item by ID",
            "DELETE /menu/:id": "Delete a menu item by ID"
        } 
    }); 
});

app.get('/menu', (req, res) => {
      res.json(menuItems);
});

app.get('/menu/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = menuItems.find(m => m.id === itemId);
  
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Menu item not found' });
    }
});

// POST menu items
app.post('/menu', (req, res) => {
    const { name, description, price, category, ingredients, available } = req.body;
  
    const newItem = {
        id: menuItems.length + 1,
        name,
        description,
        price,
        category,
        ingredients,
        available
    };
  
    menuItems.push(newItem);
  
    res.status(201).json(newItem);
});


// PUT menu items
app.put('/menu/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const { name, description, price, category, ingredients, available } = req.body;
  
    const itemIndex = menuItems.findIndex(m => m.id === itemId);
  
    if (itemIndex === -1) {
          return res.status(404).json({ error: 'Menu item not found' });
    }
  
    menuItems[itemIndex] = {
        id: itemId,
        name,
        description,
        price,
        category,
        ingredients,
        available
    };
  
    res.json(menuItems[itemIndex]);
});


// DELETE menu items
app.delete('/menu/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
  
    const itemIndex = menuItems.findIndex(m => m.id === itemId);
  
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Menu item not found' });
    }
  
    const deletedItem = menuItems.splice(itemIndex, 1)[0];
  
    res.json({ message: 'Menu item deleted successfully', item: deletedItem });
});


if (require.main === module) {
    app.listen(port, () => {
         console.log(`API server running at http://localhost:${port}`);
    });
}

module.exports = app;