const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const products = [
{
id: 1,
name: "White Simple",
price: 10,
image: "https://cdn.discordapp.com/attachments/1077745524364562496/1077745689385246902/product-1.webp",
stock: 50,
},
{
id: 2,
name: "Burn your Problems",
price: 40,
image: "https://cdn.discordapp.com/attachments/1077745524364562496/1077745689867587746/product-2.webp",
stock: 20,
},
{
id: 3,
name: "Lightbulb",
price: 25,
image: "https://cdn.discordapp.com/attachments/1077745524364562496/1077745690110865449/product-3.webp",
stock: 30,
},
{
id: 4,
name: "Work Hard",
price: 15,
image: "https://cdn.discordapp.com/attachments/1077745524364562496/1077745690408652800/product-4.webp",
stock: 40,
},
{
id: 5,
name: "Black Simple",
price: 10,
image: "https://cdn.discordapp.com/attachments/1077745524364562496/1077745690849062992/product-5.webp",
stock: 50,
},
{
id: 6,
name: "Pack 100 T-Shirts",
price: 650,
image: "https://cdn.discordapp.com/attachments/1077745524364562496/1077745691339792404/product-6.webp",
stock: 5,
},
{
id: 7,
name: "Hotel",
price: 20,
image: "https://cdn.discordapp.com/attachments/1077745524364562496/1077745691855687700/product-7.webp",
stock: 20,
},
{
id: 8,
name: "705",
price: 25,
image: "https://cdn.discordapp.com/attachments/1077745524364562496/1077745692132519936/product-8.webp",
stock: 30,
},
];

app.get("/api/products", (req, res) => {
res.send(products);
});

app.post('/api/products/pay', (req, res) => {
const { product, quantity } = req.body;

const currentStock = checkStock(product);

if (quantity > currentStock) {
res.status(400).send('There is not enough stock to process the payment order');
return;
}

updateStock(product, currentStock - quantity);

res.send('Payment order processed successfully');
});

app.use("/", express.static("front"));

app.listen(port, () => {
console.log(`Example app listening on port http//localhost:${port}`);
});

function checkStock(product) {
const item = products.find(p => p.name === product);
return item.stock;
}

function updateStock(product, quantity) {
const item = products.find(p => p.name === product);
item.stock = quantity;
}