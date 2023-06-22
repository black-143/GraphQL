const graphql=require('graphql')

const _=require('lodash')
const{
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
}=graphql

//dummy data

var books=[
    {name:'Fantasy of Wind',genre:'fantasy',id:'1',authorId:'1'}]

var authors=[
    {name:'patrick',age:44,id:'1'}
]
const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors,{id:parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields :{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{ type:GraphQLID}},
            resolve(parent,args){
                console.log(typeof(args.id))
                
                //code to get data from db
                return _.find(books,{id:args})
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){

                return _.find(authors,{id:args.id})
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books //return entire book without specific condition
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors//return all authors
            }
        }

    }
})



module.exports = new GraphQLSchema({
    query:RootQuery
})