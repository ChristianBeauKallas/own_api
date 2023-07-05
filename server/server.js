const express = require("express");
const config = require('./config')
const app = express();
const router = require('./routes')
const morgan = require('morgan')
const cors = require('cors');

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/api', router);

app.use((err, req, res, next) => {
    console.log(err);
    res.json({ name: err.name, msg: err.message });
});

app.listen(5002, () => {
    console.log(`Server listening on port 5002...`);
});
