
const config={
    client: 'mysql',
    connection: {
        host: process.env.hostname,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        port:4406
    }
}
module.exports=config;