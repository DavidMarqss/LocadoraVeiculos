const express = require('express');
const router = express.Router();

const login = require('./middleware/login.js');
const UserController = require("./controllers/UserController");
const CarController = require("./controllers/CarController");
const RegisterController = require('./controllers/RegisterController.js');




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

//Reservas----
router.get('/registers', RegisterController.getAllRegisters);
router.get('/register/:id_aluguel', RegisterController.getRegisterById);
router.post('/register', login.required, RegisterController.addRegister);
router.put('/register/:id_aluguel', login.required, RegisterController.updateRegister);
router.delete('/register/:id_aluguel', login.required, RegisterController.delRegister)


module.exports = router;
