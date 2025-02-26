import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Opinion Manager API",
            version: "1.0.0",
            description: "API para gestionar opiniones de usuarios",
            contact:{
                name: "Marco Bolanos",
                email: "mbolanos-2023060@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://localhost:3000/opinionmanager/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/users/user.routes.js",
        "./src/posts/posts.routes.js",
        "./src/comments/comments.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}