const axios = require('axios');
const { MY_API_KEY } = process.env;

const getGamesByName = async (name) => {
    //Lo busco en la API
    const dataApi = await axios.get(`https://api.rawg.io/api/games?search=${name.toLowerCase()}&key=${MY_API_KEY}`);
    
    //Valido que sea mayor a 15
    if(dataApi.data.results.length > 15){
        dataApi.data.results.length = 15
    }
    //Mapeo la data y retorno un Array con 15 objetos
    const gameApi = dataApi.data.results.map(el => {
        return {
            id: el.id,
            name: el.name,
            description: el.description,
            released: el.released,
            rating: el.rating,
            image: el.background_image,
            genres: el.genres.map(genre => genre.name).join(' '),
            platform: el.platforms.map((el) => el.platform.name).join(' ')
        }
    })
    return gameApi;
}

module.exports = { getGamesByName };