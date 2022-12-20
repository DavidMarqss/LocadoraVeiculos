const express = require('express');
const router = express.Router();

const login = require('./middleware/login.js');



const UserController = require("./controllers/UserController");
const CarController = require("./controllers/CarController");




//Usuários----
router.get('/users', UserController.getAll);
router.get('/user/:id', UserController.getById);
router.post('/user',login.required,UserController.addUser);
router.put('/user/:id', login.required,UserController.updateUser);
router.delete('/user/:id', login.required,UserController.delUser);
router.post('/login', UserController.login);

//Carros----
router.get('/cars', CarController.getAllCars)
router.get('/cars/:id_car', CarController.getCarById)
router.post('/cars', login.required,CarController.addCar);
router.put('/cars/:id_car', login.required,CarController.updateCar);
router.delete('/cars/:id_car', login.required,CarController.delCar);





module.exports = router;
