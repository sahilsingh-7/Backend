import {createServer} from 'http';
import url from 'url';
import fs from 'fs/promises'
const port = process.env.PORT;


const users = [
    {id:1,name:'sahil'},
    {id:2,name:'john'},
    {id:3,name:'joe'}
];

const createuser = (req,res)=>{
    let body = '';
    req.on('data',(chunk)=>{
        body+=chunk.toString();
    });
    req.on('end',()=>{
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    });
}


const userNotFound = (req,res)=>{
        res.setHeader('content-type','text/plain');
        res.statusCode = 404;
        res.write('user not found');
        res.end();
}


const server = createServer((req,res)=>{
    if(req.url === '/api/users' && req.method==='GET'){
        res.setHeader('content-type','application/json');
        res.write(JSON.stringify(users));
        res.end();
    }
    else if(req.url.match(/\/api\/users\/(\d+)/) && req.method === 'GET'){
        const id = parseInt(req.url.match(/\/api\/users\/(\d+)/)[1],10);
        console.log(id);
        const user = users.find ((user) => user.id === id);
        console.log(user);
        if(user){
            res.setHeader('content-type','application/json');
            res.statusCode = 200;
            res.write(JSON.stringify(user));
            res.end();
        }
        else {
            userNotFound(req,res);
        }
    }
    else if(req.url === '/api/users' && req.method ==='POST'){
        createuser(req,res);
    }
    else {
        res.setHeader('content-type','text/plain');
        res.statusCode = 404;
        res.write('route not found');
        res.end();
    }
    
});
server.listen(port,()=>{
    console.log(`server running at port ${port}`);
});


