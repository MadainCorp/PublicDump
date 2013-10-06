
var environments ={
    dev: {
        name:"development"
        ,httpServer: { ip: "127.0.0.1", port: 1339 }
        , mongoDBServer: { connectionString:"mongodb://127.0.0.1:1333/testDB"}
    }
}


module.exports = environments.dev;