const { videoGameById } = require('../controllers/videoGameIdControler');

//Establesco mi búsqueda para buscar por ID recibido por params
const getGameById = async (req, res) => {
    //console.log('RUTA POR ID PARAMS A http://localhost:3001/videogames/idVidegame?&key=....');
    try {
        const { id } = req.params;
        const gameId = await videoGameById(id);
        //console.log(gameId);
        if(!gameId){
            res.status(404).json({msg: `El ID: ${id} no corresponde a ningun videogames existente, pruebe ingresar con otro ID`});
        }else{
            res.status(200).json(gameId);
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { getGameById };