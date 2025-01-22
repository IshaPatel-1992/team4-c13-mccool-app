import express from 'express'
import quickSearchController from './src/controllers/quickSearchController'
import resourcesController from './src/controllers/resourcesController';  
import mongoose from 'mongoose';


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

quickSearchController.quickSearchRoutes(app);
resourcesController.resourcesRoutes(app);

const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});

server.on('close',() => {
    console.log('Closing mongo connection')
    mongoose.connection.close()
});