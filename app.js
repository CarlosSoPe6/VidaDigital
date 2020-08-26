const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

const valuesRouter = require('./routes/values.route');

app.use('/api/values', valuesRouter);

app.listen(port, () => {
    console.log(`Application running on port ${port}`);
});
