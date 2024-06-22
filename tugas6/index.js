const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let categories = [
    {id : 1, name: "Elektronik"},
    {id : 2, name: "Perabotan"}
];

let products = [
    { id: 1, name: 'Laptop', category: 'Elektronik' },
    { id: 2, name: 'Meja', category: 'Perabotan' }
];

app.get('/categories', (req, res)=>{
    res.json(categories);
})

app.get('/categories/:id',(req, res)=>{
    const categoriesId = parseInt(req.params.id);
    const category = categories.find( cat => cat.id === categoriesId);
    if (category) {
        res.json(category);
    }else {
        res.status(404).json({message:"Category tidak ditemukan"});
    }
});

app.post('/categories', (req, res)=>{
    const newCategory = req.body;
    newCategory.id = categories.length ? categories[categories.length - 1].id + 1 : 1;
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

app.put('/categories/:id', (req, res)=>{
    const categoryId = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(p=> p.id === categoryId);
    if (categoryIndex !== -1) {
        categories[categoryIndex] = {id : categoryId, ...req.body};
        res.json(categories[categoryIndex]);
    } else {
        res.status(404).json({message:"Category tidak ditemukan"});
    }
});

app.delete('/categories/:id', (req, res)=>{
    const categoryId = parseInt(req.params.id);
    categories = categories.filter(p=>p.id !== categoryId);
    res.status(204).send();
})

app.get('/products', (req, res) => {
    const productName = req.query.name;
    
    if (!productName) {
        return res.status(400).json({ error: 'Nama produk harus diberikan sebagai query parameter' });
    }
    
    // Cari produk berdasarkan nama
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(productName.toLowerCase())
    );
    
    res.json(filteredProducts);
});

// Route GET untuk mendapatkan produk berdasarkan kategori dan nama
app.get('/products/:category', (req, res) => {
    const category = req.params.category;
    const productName = req.query.name;
    
    if (!productName) {
        // Jika tidak ada nama yang diberikan, cari berdasarkan kategori saja
        const filteredByCategory = products.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
        return res.json(filteredByCategory);
    }
    
    // Jika ada nama yang diberikan, cari berdasarkan kategori dan nama
    const filteredProducts = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase() &&
        product.name.toLowerCase().includes(productName.toLowerCase())
    );
    
    res.json(filteredProducts);
});

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})