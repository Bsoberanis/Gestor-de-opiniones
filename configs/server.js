'use strict'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConexion } from "./mongo.js"
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import publicationRoutes from '../src/posts/posts.routes.js';
import commentRoutes from '../src/comments/comments.routes.js'
import apiLimiter from "../src/middlewares/validar-cantidad-peticiones.js"
import {swaggerDocs, swaggerUi} from "./swagger.js"

const middlewares = (app) =>{
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/opinionmanager/v1/auth", authRoutes)
    app.use("/opinionmanager/v1/user", userRoutes)
    app.use("/opinionmanager/v1/posts" , publicationRoutes)
    app.use("/opinionmanager/v1/comments", commentRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () =>{
    try{
        await dbConexion()
    }catch(e){
        console.log(`DATABASE CONNECTION FAILED: ${e}`)
        process.exit(1)    
    }
}

export const inicioServidor = () =>{
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`SERVER CORRIENDO EN EL PUERTO ${process.env.PORT}`)
    }catch(err){
        console.log(`FALLO INICIO DEL SERVIDOR: ${err}`) 
    }
}