const { getAllGames } = require('../controllers/videoGameController');
const { getGamesByName } = require('../controllers/videoGameNameController');

const getGamesHandler = async (req, res) => {
    // console.log('RUTA A http://localhost:3001/videogames?&key=... Y A http://localhost:3001/videogames?name="..."&key=...');
    try {
        const { name } = req.query;
        // Validate name
        if(name){
            const videogames = await getGamesByName(name);
            
            if(videogames.length){
                res.status(200).json(videogames)
            }
            throw new Error({message: "Videogame not found"}); 
        }else{
            const allGames = await getAllGames();
            res.status(200).json(allGames);
        }
    } catch (error) {
        res.status(404).json(error.message);
    }
}

module.exports = { getGamesHandler };