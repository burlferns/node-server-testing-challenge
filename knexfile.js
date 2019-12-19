// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // only needed when using SQLite3
    connection: {
      filename: './data/car-dealer.db3'
    },
    migrations: {
      directory: "./data/migrations" 
    },
    seeds: {
      directory: "./data/seeds" 
    }
  } 

};
