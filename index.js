const express = require('express');
const port    = process.env.PORT || 4000;
const app     = express();
const dest    = `${__dirname}/public`;
// const cors       = require('cors');

app.use(express.static(dest));
// app.use(cors());

app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
