const app = require('express')()


const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => { 
    return res.send('Hola que tal');
})
app.listen(PORT, () => {
    console.log('Listening in PORT ' + PORT);
})