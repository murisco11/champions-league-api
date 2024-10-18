import mysql2 from "mysql2"

const db = mysql2.createConnection({
    user: "root",
    database: "champions",
    password: "foto0981",
    port: 3306,
    host: "localhost"
})

export default db