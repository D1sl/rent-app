const express = require('express');
const path = require('path');

// Apollo Server
const { ApolloServer } = require('apollo-server-express');

// typeDefs and Resolvers
const { typeDefs, resolvers } = require('./schemas');

// Auth
const { authMiddleware } = require('./utils/auth');

// Database
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Apollo Server with GraphQL
const startApolloServer = async(typeDefs, resolvers) => {
    await server.start();
    // Integrate Apollo Server with Express as Middleware
    server.applyMiddleware({ app });

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    })

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`)
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer(typeDefs, resolvers);