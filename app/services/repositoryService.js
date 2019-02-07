var mysql = require('mysql');
let Enviroment = require('./../configuration/enviroment');

const env = new Enviroment();
const pool = mysql.createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  acquireTimeout   : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host: env.props.db.host,
  user: env.props.db.user,
  password: env.props.db.password,
  database: env.props.db.database,
  port: 3306
  });

module.exports.insertFavoritePokemon = async (name,imgUrl,type) => {
  return new Promise((resolve,reject) => {

    var query =   `INSERT INTO FavoritePokemon
    (Name,ImageURL,Type) 
    VALUES('${name}','${imgUrl}','${type}')`;
    pool.getConnection((err, connection) => {
        console.log(err)
      connection.query(query,  (error, results, fields) => {
        if (error) {
            connection.close();

            console.log(error);
            return reject(error)};
        resolve(results);
      });
    });
  });
};
module.exports.deleteFavoritePokemon = async (name) => {
    return new Promise((resolve,reject) => {
  
  
      var query =   `DELETE FROM FavoritePokemon WHERE name = '${name}' `;
      pool.getConnection((err, connection) => {
        connection.query(query,  (error, results, fields) => {
          connection.release();
          if (error) return reject(error);
          resolve(results);
        });
      });
    });
  };

  module.exports.selectFavoritePokemons = async () => {
    return new Promise((resolve,reject) => {
  
  
      var query =   `SELECT * FROM FavoritePokemon`;
      pool.getConnection((err, connection) => {
          console.log(err)
        connection.query(query,  (error, results, fields) => {
          if (error) {
          connection.release();
          return reject(error)
          } ;
          let obj = [];
          console.log(results)
          results.forEach(row =>{
            obj.push({name: row.Name,type: row.Type,imageURL: row.ImageURL})
          });
          console.log(obj)
          resolve(obj);
        });
      });
    });
  };