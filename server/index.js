require('dotenv').config();
const app = require('express')()
const bodyParser = require('body-parser');
const {router} = require('./routers/router')
const cors = require('cors');

const PORT = process.env.PORT || 5000;


app.use(bodyParser.json())
app.use(cors());

app.use('/api', router);


app.get('/', (req, res) => { 
    return res.send('Hola que tal');
})
app.listen(PORT, () => {
    console.log('Listening in PORT ' + PORT);
})