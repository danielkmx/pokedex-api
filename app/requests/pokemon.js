const { getPokemon } = require('../services/pokemonService');
const { insertFavoritePokemon , selectFavoritePokemons , deleteFavoritePokemon} = require('../services/repositoryService');


module.exports.fetchPokemon = async (event) => {
    try{
        let response = await getPokemon(event.pathParameters.name);
        return {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*',
            }, body:response};
    }catch(error){
        return error;
    }

};


module.exports.AddFavoritePokemon = async (event) => {
    try{
        let pokemon = JSON.parse(event.body);
        let response = await insertFavoritePokemon(pokemon.name,pokemon.type,pokemon.image);

        return {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*',
            }, body: JSON.stringify('Pokemon added to favorite!')}
    }
    catch(error){
        console.log(error);
        return{ statusCode: 400 , body: error}

    }
}
module.exports.getAllFavoritePokemon = async (event) => {
    try{
        let response = await selectFavoritePokemons();
        return {
            "statusCode": 200,
            
            "headers": {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(response)}
    }catch(error){
        console.log(error);
        return{ 
            statusCode: 400 , body: error}
    }
}
module.exports.deleteFavoritePokemon = async (event) => {
    try{
        let response = await deleteFavoritePokemon(event.pathParameters.name);
        return {
            "headers": {
                'Access-Control-Allow-Origin': '*',
            }, 
            "statusCode": 201 ,body: JSON.stringify('Pokemon removed from favorites')}
    }catch(error){
        console.log(error);
        return{ statusCode: 400 , body: error}
    }
}