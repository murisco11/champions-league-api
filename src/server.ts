import createApp from "./app"
import db from "./db"

const app = createApp()
const port = process.env.PORT

db.connect((err) => {
    if (err) {
        console.log("Error in DB")
    } else {
        console.log("Connect DB")
        app.listen(port, () => {
            console.log("Server init")
        })
    }
})