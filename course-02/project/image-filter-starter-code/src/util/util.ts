import fs from 'fs';
import Jimp = require('jimp');
import axios from "axios";

const fsExtra = require('fs-extra');

const directory = __dirname + '/tmp';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        try{
            /*const photo = await Jimp.read(inputURL);*/
            const photo = await axios({method: 'get', url: inputURL, responseType: 'arraybuffer'}).then(function ({data:imageBuffer}){
                return Jimp.read(imageBuffer);
            })
            const outpath = directory + '/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
            await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(outpath, (img)=>{
                resolve(outpath);
            });
        } catch(e){
            resolve("error");
        }
    });
}

// emptyFileDir
// helper function to empty the file directory
// useful to cleanup after tasks
export async function emptyFileDir(){
    fsExtra.emptyDirSync(directory);
}