const { Videogame } = require('../db');
// const { getAllGames } = require('../controllers/videoGameController');
const { createVideogame } = require('../controllers/createGameController');

const createGameHandler = async (req, res) => {
    //console.log("RUTA PARA CREAR UN VIDEOGAME");
    try {
        const {name, description, released, rating, platforms, genres, image } = req.body;
        //Validate information
        if(!name || !description || !platforms){
            res.status(400).json({msg: "Missing send data"})
        }
        //Validate name  
        const videoGameFound = await Videogame.findAll({
            where: {
                name: name
            }
        })
        if(videoGameFound.length != 0){
            res.json({msg: "The videogame with that name already exists"});
        }
        // const allVideogame = await getAllGames();
        // console.log(AllVidegame);
        // const found = allVideogame.find(
        //     (el) => el.name.toLowerCase() === name.toLowerCase()
        // )
        // }else{
        //     res.status(200).json({msg: "El nombre del videogame ya existe"})
        // }
        const newVideogame = await createVideogame(name, description, released, rating, platforms, genres, image );
        console.log(newVideogame);
        res.status(200).json({msg: "Videogame created successfully"});
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createGameHandler };