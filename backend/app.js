const serviceBase = {
    port: 3000,
    url: 'azat.co'
}

const getAccounts = () => {
    return[1, 2, 3]
}

const accountService = {
    __proto__:serviceBase,
    getUrl(){
        return "http://" + this.url + ":" + this.port
    },
    getAccounts()
   /* toString(){
        return JSON.stringify((super.valueOf()))
    },
    ['valueOf_' + getAccounts().join('_')]: getAccounts()
    */
}
console.log(accountBase);

// define/create a function
// * named function
function f(){
    console.log("Hi");
    return true
}

// * anonymous function
const f = function(){
    console.log("Hi");
    return true
}

// * es6 arrow function:
const f=() =>{
    console.log("Hi");
    return true
}

// callbacks on js
const numReverse = function(num){
    return num + 10
}
const rumReverse = (rum, fn) =>{
    return fn(rum)
}

rumReverse(8, numReverse) // this is a callback

// implicit return in js
const implicitReturnexample = (a, b) => a + b // this is an example of implicit return in js

// arrays in js
let arr = []
let arr1 = new Array(1, 'hi', [1, 2, 3], {'a': 3}, () => {console.log("oh dear")})

console.log(arr1[4]());

// prototypical inheritance
let user = function(ops){
    return { firstName: ops.firstName || 'John',
    lastName: ops.lastName || 'Doe',
    email: ops.email || 'johndoe@test.com',
    name: function() {return this.firstName + this.lastName}
    }
}

let agency = function(ops){
    ops = ops || {}
    var agency = user(ops)
    agency.customers = ops.customers || 0
    agency.isAgency = true
    return agency
}

// 
class baseModel{
    constructor(options = {}, data = []){
        this.name = 'baseName'
        this.url = 'http://baseurl.co/api'
        this.data = data
        this.options = options
    }
    getName(){
        console.log(`Class name: ${this.name}`);
    }
}

class AccountModel extends baseModel{
    constructor(options, data){
        // called the parent class with super
        super({private: true}, ['21432525', '462621276'])
        this.name = 'Account Model'
        this.url += '/accounts/'
    }
    get accountsData(){
        return this.data
    }
}

// http connection to db with routes but no IDs without express.
const http = require('http')
const util = require('util')
const querystring = require('querystring')
const mongo = require('mongodb')
const host = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017'

mongo.Db.connect(host, (error, client) => {
    if (error) throw error;
    let collection = new mongo.Collection(
        client,
        'test_collection'
    )
    let app = http.createServer(
        (request, response) => {
            if (
                request.method === 'GET' && 
                request.url === '/messages/list.json'
            ){
                collection.find().toArray((error, results) =>{
                    response.writeHead(
                        200,
                        {'Content-Type': 'text/plain'}
                    );
                    console.dir(results)
                response.end(JSON.stringify(results))
                })
            }
            if (
                request.method === 'POST' &&
                request.url === '/messages/create.json'
            ){
                request.on('data', (data) => {
                    collection.insert(
                        querystring.parse(data.toString('utf-8')),
                        {safe:true},
                        (error, obj) => {
                            if (error) throw error
                            response.end(JSON.stringify(obj))
                        }
                    )
                })
            }
        }
    )
    const port = process.env.PORT || 5000
    app.listen(port)
})
