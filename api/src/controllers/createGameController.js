const  { Videogame, Genres } = require('../db');

const createVideogame =  async (name, description, released, rating, platforms, genres, image) => {
    
    const newVideoGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        image,
        platforms
    })

    const genreDB = await Genres.findAll({
        where: {
            name: genres
        }
    })
    
    newVideoGame.addGenres(genreDB)
    return newVideoGame.dataValues;
}

module.exports = { createVideogame };