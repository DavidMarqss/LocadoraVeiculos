const db = require('../db');


module.exports = {

    getAllRegisters: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM reservas
            INNER JOIN (SELECT id,nome FROM usuarios) AS u ON u.id = reservas.id_user
            INNER JOIN veiculos ON veiculos.id_car = reservas.id_car`, (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },

    getRegisterById: (id_aluguel) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query(`SELECT * FROM reservas 
            INNER JOIN (SELECT id,nome FROM usuarios) AS u ON u.id = reservas.id_user
            INNER JOIN veiculos ON veiculos.id_car = reservas.id_car WHERE id_aluguel =?`, [id_aluguel], (error, results)=>{
                if(error) { rejeitado(error); return;}
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            })
        })
    },

    addRegister: (id_aluguel, id_user, id_car, data_inicio, data_fim, hora_inicio, hora_fim) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('INSERT INTO reservas(id_aluguel, id_user, id_car, data_inicio, data_fim, hora_inicio, hora_fim) VALUES(?,?,?,?,?,?,?)', 
                [id_aluguel, id_user,id_car, data_inicio, data_fim, hora_inicio, hora_fim], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertId);
              
                }
            );  
        });
    },

    updateRegister: (id_aluguel, id_user, id_car, data_inicio, data_fim, hora_inicio, hora_fim) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE reservas SET id_aluguel = ?, id_user = ?, id_car = ?, data_inicio = ?, data_fim = ?, hora_inicio = ?, hora_fim = ? WHERE id_aluguel = ?', 
                [id_aluguel, id_user, id_car, data_inicio, data_fim, hora_inicio, hora_fim, id_aluguel], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
              
                }
            );
        });
    },

    delRegister: (id_aluguel)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM reservas WHERE id_aluguel=?', [id_aluguel], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },

}