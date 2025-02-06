import express from 'express';
import quickSearchController from './src/controllers/quickSearchController';
import resourcesController from './src/controllers/resourcesController';  
import userFavoritesController from './src/controllers/userFavoritesController';
import mongoose from 'mongoose';
import cors from 'cors';
import signupController from './src/controllers/signupController';

const app = express();
const port = process.env.PORT || 4000;

// Middleware for logging requests

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  //console.log("Request Headers:", req.headers);
  //console.log("Request Body:", req.body);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set up routes
quickSearchController.quickSearchRoutes(app); 
resourcesController.resourcesRoutes(app); 
userFavoritesController.FavoritesRoutes(app);
resourcesController.resourcesRoutes(app);
signupController.signupRoutes(app);

// Start the server
const server = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// Handle server close event
server.on('close', () => {
  console.log('Closing mongo connection');
  mongoose.connection.close();
});
