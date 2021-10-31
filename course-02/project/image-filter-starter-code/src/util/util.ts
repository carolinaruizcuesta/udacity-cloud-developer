import Jimp = require('jimp');

const fsExtra = require('fs-extra');

const file_directory = __dirname + '/tmp';



// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        console.log(inputURL);
        const photo = await Jimp.read(inputURL);
        const outpath = file_directory + '/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        console.log(outpath);
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(outpath, (img)=>{
            resolve(outpath);
        });
    });
}

// emptyDirFiles
// helper function to empty the directory where the files are stored
export async function emptyDirFiles(){
    fsExtra.emptyDirSync(file_directory);
}
