import http from 'http'
import url from 'url'
import path from 'path'
import fs from 'fs/promises'

const port = process.env.PORT2;
const _filename = url.fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
console.log(_filename,_dirname);

const server = http.createServer(async (req,res)=>{
    try{
        if(req.method === 'GET'){
            let filepath;
            if(req.url === '/'){
                filepath = path.join(_dirname , 'attach','home.html');
            }
            else if(req.url === '/about'){
                filepath = path.join(_dirname,'/attach','about.html');
            }
            else throw new error('page not found');

            const data = await fs.readFile(filepath);
            res.setHeader('content-type','text/html');
            res.write(data);
            res.end();
        }
        else throw new error("method not supported");
    }
    catch (e){
        res.setHeader(404,{'content-type':'text-plain'});
        res.end('page not found error');
    }
})

server.listen(port,()=>{
    console.log(`server started at port :${port}`);
})
