import http from 'http';
import fs from 'fs/promises'
import url from 'url'
import path from 'path'
import { error } from 'console';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;


console.log(__dirname,__filename);
const server = http.createServer(async(req,res)=>{
    // res.setHeader('Content-Type','text/html');
    // res.statusCode = 404;

    try{
        if(req.method === 'GET'){
            let filepath;
            if(req.url === '/'){
                filepath = path.join(__dirname,'attach','home.html');
            }
            else if(req.url === '/about'){
                filepath = path.join(__dirname,'attach','about.html');
            }
            else {
                throw new error('Error page not found');
            }
            const data = await fs.readFile(filepath);
            res.setHeader('Content-Type','text/html');
            res.write(data);
            res.end();
        }
        else throw new error('method not found');
    }
    catch(e){
        res.writeHead(404,{'content-type':'text/plain'});
        res.end('not able to process req');
    }
    
});
server.listen(port,()=>{
    console.log(`server launched successfully at port :${port}`);
});
