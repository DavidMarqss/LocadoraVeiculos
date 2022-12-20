const db = require('../db');

module.exports = {
    getAllCars: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM veiculos`, (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },

    getCarById: (id_car) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query(`SELECT * FROM veiculos WHERE id_car =?`, [id_car], (error, results)=>{
                if(error) { rejeitado(error); return;}
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            })
        })
    },

    addCar: (id_car, marca, modelo, ano) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('INSERT INTO veiculos (id_car, marca, modelo, ano ) VALUES(?,?,?,?)', 
                [id_car, marca, modelo, ano], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertId);
              
                }
            );  
        });
    },

    updateCar: (id_car, marca, modelo, ano) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE veiculos SET marca = ?, modelo = ?, ano = ? WHERE id_car = ?', 
                [marca, modelo, ano, id_car], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
              
                }
            );
        });
    },

    delCar: (id_car)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM veiculos WHERE id_car=?', [id_car], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },
};