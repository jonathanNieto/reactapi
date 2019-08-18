const express = require('express');

const routes = require('./routes/index.routes');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


/* routing */
app.use('/', routes);

app.listen(app.get('port'), () => {
    console.log(`App listening on ${app.get('port')} port!`);
});

//Run app, then load http://localhost:3000 in a browser to see the output.