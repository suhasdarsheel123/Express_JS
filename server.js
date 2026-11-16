import express from 'express'
const app = express();
app.use(express.json());
const products = [];

app.get('/', (req, res) => {
  res.send('Product API is running!');
});
app.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(200).json({
        message: "product created successfully", 
        data: newProduct 
    });
});

app.get('/products', (req, res) => {
    res.status(200).json({
        message: "All products fetched successfully", 
        data: products
    });
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (product) {
        res.status(200).json({
            message: "product details fetched successfully",
            data: product
        });
    } else {
        res.status(404).json({message: "product not found"});
    }
});

app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const productIndex = products.findIndex(p => p.id === productId);
    
    if(productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        res.status(200).json({
            message: "product updated successfully", 
            data: products[productIndex]
        });
    } else {
        res.status(404).json({message: "product not found"});
    }
});

app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if(productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1);
        res.status(200).json({
            message: "product deleted successfully", 
            data: deletedProduct[0]
        });
    } else {
        res.status(404).json({message: "product not found"});
    }
});

app.listen(5000, () => {
    console.log('Server is running at http://localhost:5000');
});
