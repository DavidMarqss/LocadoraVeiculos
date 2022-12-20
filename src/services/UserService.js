const db = require('../db');

module.exports = {
    getAll: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM usuarios`, (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },

    getById: (id) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query(`SELECT * FROM usuarios WHERE id =?`, [id], (error, results)=>{
                if(error) { rejeitado(error); return;}
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            })
        })
    },

    addUser: (id,nome,hashedPassword) =>{
        return new Promise(async (aceito, rejeitado)=>{
    

            db.query('INSERT INTO usuarios (id,nome,senha) VALUES(?,?,?)', 
                [id, nome, hashedPassword], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertId);
              
                }
            );  
        });
    },

    updateUser: (id,nome,hashedPassword) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE usuarios SET id = ?, nome = ?, senha = ? WHERE id = ?', 
                [id, nome, hashedPassword, id], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
              
                }
            );
        });
    },
    delUser: (id)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM usuarios WHERE id=?', [id], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },


    login: (nome) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT nome, senha FROM usuarios WHERE nome=?', [nome], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            })
        })
    }


   

};