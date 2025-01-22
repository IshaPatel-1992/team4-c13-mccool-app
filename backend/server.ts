import express from 'express'
import quickSearchController from './src/controllers/quickSearchController'
import mongoose from 'mongoose';


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

quickSearchController.quickSearchRoutes(app);

const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});

server.on('close',() => {
    console.log('Closing mongo connection')
    mongoose.connection.close()
});