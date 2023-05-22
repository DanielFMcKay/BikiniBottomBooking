const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./routes');
const path = require('path');
const sessionConfig = { secret: 'secret'};
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const Howler = require('howler');

app.engine('handlebars', hbs.engine);
app.use(session(sessionConfig));


const sequelize = require('./config/connections');

const PORT = process.env.PORT || 3001;



app.set('view engine', 'handlebars');

// Express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);




// Start server
sequelize.sync({force: false}).then(() => {
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})});