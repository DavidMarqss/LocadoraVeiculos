const UserService = require("../services/UserService");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {
   
    getAll: async (req, res)=>{
        let json = {error:'', result:[]};

        let users = await UserService.getAll();
        if(users){
            json.result = users;
        }
        res.json(json);
    },

    getById: async(req, res) =>{
        let json = {error:'', result:{}};
        let id = req.params.id;
        let user = await UserService.getById(id);

        if(user){
            json.result = user;
        }
        res.json(json);
    },

    addUser: async(req, res) =>{
        let json = {error:'', result:{}};

        let id = req.body.id;

        let nome = req.body.nome;
        
        let senha = req.body.senha;
        
       

        try{
            const hashedPassword = await bcrypt.hash(senha, 8)
            await UserService.addUser(id, nome, hashedPassword);
            json.result = {
                msg: "Cadastrado com Sucesso",
                nome,
                senha  
                
                
            };
        }catch(error){
            console.log(error)
        }
        res.json(json);
    },

    updateUser: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let id = req.body.id;
        let nome = req.body.nome;
        let senha = req.body.senha;
        
        
        

       
        try{
            const hashedPassword = await bcrypt.hash(senha, 8)
            await UserService.updateUser(id, nome, hashedPassword);
            json.result = {
                msg: "Alterado com Sucesso",
                id,
                nome,
                senha,

            };
        }catch(error){
            console.log(error);
        }
        res.json(json);
    },
    delUser: async(req, res) => {
        let json = {error: '', result:{}};

        await UserService.delUser(req.params.id);
        json.result = {
            msg: "Deletado com Sucesso"
        }
        res.json(json);
    },

    login: async(req, res) => {
        
        
        try {
            let nome = req.body.nome;
            let senha = req.body.senha;
            var results = await UserService.login(nome);
            
    
            if (await bcrypt.compareSync(senha, results[0].senha)) {
                const token = jwt.sign({
                    nome: results[0].nome,
                    senha: results[0].senha
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1d"
                });
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    token: token
                });
            }
            return res.status(401).send({ message: 'Falha na autenticação' })
    
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Falha na autenticação' });
        }
    
    },


    

    



}