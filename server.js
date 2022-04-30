require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
