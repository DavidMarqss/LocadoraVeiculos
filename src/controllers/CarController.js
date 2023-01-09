const CarService = require("../services/CarService");
module.exports = {
    getAllCars: async (req, res)=>{
        let json = {error:'', result:[]};

        let cars = await CarService.getAllCars();
        if(cars){
            json.result = cars;
        }
        res.json(json);
    },

    getCarById: async(req, res) =>{
        let json = {error:'', result:{}};
        let id_car = req.params.id_car;
        let event = await CarService.getCarById(id_car);

        if(event){
            json.result = event;
        }
        res.json(json);
    },
    
    addCar: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let id_car = req.body.id_car;
            
        let marca = req.body.marca;
        
        let modelo = req.body.modelo;
        
        let ano = req.body.ano;
        

       
        try{
            await CarService.addCar(id_car, marca, modelo, ano);
            json.result = {
                msg: "Cadastrado com Sucesso",
                id_car,
                marca,
                modelo,
                ano
                
                
            };
        }catch(error){
            console.log(error)
        }
        res.json(json);
    },

    updateCar: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let id_car = req.body.id_car;
            
        let marca = req.body.marca;
        
        let modelo = req.body.modelo;
        
        let ano = req.body.ano;
        
        
        

       
        try{
            await CarService.updateCar(id_car, marca, modelo, ano);
            json.result = {
                msg: "Alterado com Sucesso",
                id_car,
                marca,
                modelo,
                ano
            };
        }catch(error){
            console.log(error);
        }
        res.json(json);
    },

    delCar: async(req, res) => {
        let json = {error: '', result:{}};

        await CarService.delCar(req.params.id_car);
        json.result = {
            msg: "Deletado com Sucesso"
        }
        res.json(json);
    },
};
   