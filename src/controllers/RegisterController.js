const RegisterService = require("../services/RegisterService");


module.exports = {

    getAllRegisters: async (req, res)=>{
        let json = {error:'', result:[]};

        let registers = await RegisterService.getAllRegisters();
        if(registers){
            json.result = registers;
        }
        res.json(json);
    },

    getRegisterById: async(req, res) =>{
        let json = {error:'', result:{}};
        let id_aluguel = req.params.id_aluguel;
        let register = await RegisterService.getRegisterById(id_aluguel);

        if(register){
            json.result = register;
        }
        res.json(json);
    },

    addRegister: async(req, res) =>{
        let json = {error:'', result:{}};

        let id_aluguel = req.body.id_aluguel;

        let id_user = req.body.id_user;

        let id_car = req.body.id_car;

        let data_inicio = req.body.data_inicio;

        let data_fim = req.body.data_fim;

        let hora_inicio = req.body.hora_inicio;

        let hora_fim = req.body.hora_fim;
        
       

        try{
            await RegisterService.addRegister(id_aluguel, id_user, id_car, data_inicio, data_fim, hora_inicio, hora_fim);
            json.result = {
                msg: "Reserva feita",
                id_aluguel,
                id_user,
                id_car,
                data_inicio,
                data_fim,
                hora_inicio,
                hora_fim
                
                
            };
        }catch(error){
            console.log(error)
        }
        res.json(json);
    },

    updateRegister: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let id_aluguel = req.body.id_aluguel;

        let id_user = req.body.id_user;

        let id_car = req.body.id_car;

        let data_inicio = req.body.data_inicio;

        let data_fim = req.body.data_fim;

        let hora_inicio = req.body.hora_inicio;

        let hora_fim = req.body.hora_fim;
        
        
        

       
        try{
            await RegisterService.updateRegister(id_aluguel, id_user, id_car, data_inicio, data_fim, hora_inicio, hora_fim);
            json.result = {
                msg: "Alterado com Sucesso",
                id_aluguel,
                id_user,
                id_car,
                data_inicio,
                data_fim,
                hora_inicio,
                hora_fim

            };
        }catch(error){
            console.log(error);
        }
        res.json(json);
    },

    delRegister: async(req, res) => {
        let json = {error: '', result:{}};

        await RegisterService.delRegister(req.params.id_aluguel);
        json.result = {
            msg: "Deletado com Sucesso"
        }
        res.json(json);
    },

}