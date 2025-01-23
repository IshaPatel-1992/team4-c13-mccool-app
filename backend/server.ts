import express from 'express'
import quickSearchController from './src/controllers/quickSearchController'
import resourcesController from './src/controllers/resourcesController';  
import userFavoritesController from './src/controllers/userFavoritesController';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

quickSearchController.quickSearchRoutes(app); // quickSearchRoutes is a function that takes in an express app and sets up the routes
resourcesController.resourcesRoutes(app); // resourcesRoutes is a function that takes in an express app and sets up the routes
userFavoritesController.FavoritesRoutes(app); // userFavoritesRoutes is a function that takes in an express app and sets up the routes



const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
});

server.on('close',() => {
    console.log('Closing mongo connection')
    mongoose.connection.close()
});