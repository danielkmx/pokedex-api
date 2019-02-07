'use strict';
var request = require('request');
let Enviroment = require('./../configuration/enviroment')


module.exports.getPokemon = async (name) => {
    return new Promise((resolve,reject) => {
        let env = new Enviroment();
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'CLIENT_ID': env.props.stageVariables.Client_id,
            'ACCESS_TOKEN': env.props.stageVariables.Access_token,
        };
        var options = {
            url: env.props.stageVariables.PokemonURL  + '/' + name,
            method: 'GET',
            headers: headers
        }
        request(options, function (error, response, body) {
            console.log(options)
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                console.log(error)
                reject(error);
            }
        });
    });  


}