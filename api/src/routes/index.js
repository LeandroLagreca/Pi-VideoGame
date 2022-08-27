const { Router } = require('express');
const {Videogame, Genres, Op} = require('../db')
const axios = require('axios');
const {YOUR_API_KEY} = process.env;
const router = Router();
const {GetGenre} = require('./Genre')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/platforms', async(req,res)=>{
    try {
        const platformApi= await axios.get(`https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`)
        const platform = platformApi.data.results.map((e)=>{
            return {
                id: e.id,
                name: e.name
            }
        })
        res.json(platform)
    } catch (error) {
        console.log(error)
    }
})


const getVideogamesDb = async () => {
    try {
      const videoGames = await Videogame.findAll({
        include: {
          model: Genres,
          attributes: ["name"]
        },
      });
      return videoGames;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Con esta funcion obtengo los videojuegos de la api.
  const getVideoGamesApi = async () => {
    try {
      // Pido los 100 videojuegos de la API 20 por cada URL.
      const urlOne = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=1`
      );
      const urltwo = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=2`
      );
      const urlThree = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=3`
      );
      const urlFour = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=4`
      );
      const urlFive = await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=5`
      );
  
      // Concateno todas las páginas de la API.
      let videoGamesApi = urlOne.data.results.concat(
        urltwo.data.results,
        urlThree.data.results,
        urlFour.data.results,
        urlFive.data.results
      );
  
      // Mapeo los videojuegos de la API.
      videoGamesApi = videoGamesApi.map((e) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          image: e.background_image,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map((e) => e.platform.name),
          genres: e.genres.map((e) => e.name),
        };
      });
      return videoGamesApi;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Con esta funcion concanteno los videojuegos de la base de datos con los de la api.
  const allDataVideogames = async () => {
    try {
      const videogamesDb = await getVideogamesDb();
      const videoGamesApi = await getVideoGamesApi();
      const allVideoGames = videogamesDb.concat(videoGamesApi);
      return allVideoGames;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Obtener un listado de los videojuegos
  // Debe devolver solo los datos necesarios para la ruta principal
  // Con esta ruta obtengo todos los videojuegos tanto de la base de dato como de la API
  router.get("/videogames", async (req, res) => {
    const { name } = req.query;
    const allVideoGames = await allDataVideogames();
    try {
      if (name) {
        const videoGameFilter = allVideoGames.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        videoGameFilter.length
          ? res.status(200).json(videoGameFilter)
          : res.send({ message: "No se encontraron resultados" });
      } else {
        res.status(200).json(allVideoGames);
      }
    } catch (error) {
      res.send(error);
    }
  });
  
  
  // Con esta ruta obtengo los videojuegos de la api y de la base de datos para luego filtrarlos por el
  // ID y devolver el videojuego, solicitado por el usuario, en caso no encontrarselo devuelvo un error.
  router.get("/videogame/:id", async (req, res) => {
    const { id } = req.params;
    try {
      if(!Number(id)) {
        const videoGameDb = await Videogame.findOne({
          include: {
            model: Genres,
            attributes: ["name"]
          },
          where: {
            id: id,
          },
        });
        res.json(videoGameDb);
      } else {
        const videoGameApiId = ( 
          await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
        ).data;
        const videoGameApi = {
          name: videoGameApiId.name,
          description: videoGameApiId.description,
          image: videoGameApiId.background_image,
          released: videoGameApiId.released,
          rating: videoGameApiId.rating,
          platforms: videoGameApiId.platforms.map((e) => e.platform.name),
          genres: videoGameApiId.genres.map((e) => e.name),
        }
        res.json(videoGameApi)
      }
    } catch (error) {
      res.send(error);
    }
  });
  
  // con esta ruta creo un nuevo videojuego en la base de datos.
  router.post("/videogames", async (req, res) => {
    const { name, description, image, released, rating, platforms, genres, createdInDb } = req.body;
  
    if(!name || !description || !released || !rating || !platforms || !genres) {
      res.send({message: "¡Missing Data!"})
    }
  
    try {
      let newVideoGame = await Videogame.create({
        name,
        description,
        image: image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuUeHO-e5k5Y-FMN1BoRHAQnG_BZFcF02yYA&usqp=CAU',
        released,
        rating,
        platforms,
        createdInDb
      });
    
      let genreDb = await Genres.findAll({
        where: {
          name: 
            genres
        },
      });
  
      newVideoGame.addGenre(genreDb);
      res.send('Videojuego creado con exito')
  
    } catch (error) {
      console.log(error)
    }
  
  });
  
  // Con esta ruta pido los generos a la API para guardarlos en la base de datos, es una funcion que viene
  // De controllers para que se carguen los genres directamente cuando encienda el servidor.
  router.get('/genres', async (req, res) => {
    try {
      let genres = await GetGenre();
      res.json(genres);
    } catch (error) {
      res.send(error)
    }
  })
  


module.exports = router;