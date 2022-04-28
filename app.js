require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(cors({ origin: 'http://localhost:8081' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/iot', async (req, res) => {
    res.render('iot');
});

app.get('/device', async (req, res) => {
    res.render('device');
});

app.get('/', async (req, res) => {
    const result = await prisma.user.findMany();

    res.render('index');
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
