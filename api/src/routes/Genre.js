const { Router } = require('express');
const {Genres } = require('../db');
const axios = require('axios');
const {YOUR_API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const GetGenre = async () =>{
    try { 
            let ApiGenre = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
            ApiGenre.data.results.map((e)=>{
                Genres.findOrCreate({
                    where: {
                        name: e.name
                    }
                })
            })
            const dbGenre = await Genres.findAll();
            return dbGenre;
    } catch(error) {
        console.log(error);
    }
};



module.exports ={
    GetGenre
};