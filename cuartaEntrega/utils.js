import {fileURLToPath} from 'url';
import { dirname } from 'path';
import multer from 'multer';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`${_dirname}/src/public/img`)
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

export const apploader=multer({storage
    ,onerror:function(err,next){
        console.log(err);
        next();
    }
})
export default _dirname;