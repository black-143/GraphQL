const express = require('express');
const graphqlHTTP=require("express-graphql").graphqlHTTP
const schema = require('./schema/schema')
const mongoose=require('mongoose')

const app = express()
//connect to mlab database
//make sure to replae my db string & creds with your own

mongoose.connect('')
mongoose.connection.once('open',()=>{
    console.log('connected to database')
})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log("now listening for request on port 4000")
});

