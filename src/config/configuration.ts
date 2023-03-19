export default () => ({
    port: parseInt(process.env.PORT, 10) || 9000,
    database: {
        url: process.env.MONGO_URL,
        dbname: process.env.MONGO_DBNAME
    }
})