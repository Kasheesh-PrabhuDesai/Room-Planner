import express, { Express } from "express"
import mongoose, { ConnectOptions } from "mongoose"
import cors from "cors"
import roomRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000
app.use(express.json())
app.use(cors())
app.use(roomRoutes)

const uri: string = process.env.MONGO_DB_URI as string
const options = { useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })