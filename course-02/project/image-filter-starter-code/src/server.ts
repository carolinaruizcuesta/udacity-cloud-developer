import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, emptyFileDir} from './util/util';


const isImageURL = require('image-url-validator').default;
const fsExtra = require('fs-extra');
var onFinished = require('on-finished');

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  // > try it {{host}}/persons?name=the_name

   //    4. deletes any files on the server on finish of the response


  app.get( "/filteredimage/", async ( req: Request, res: Response ) => {
    let { image_url } = req.query;

    //    1. validate the image_url query
    if ( !image_url ) {
      return res.status(400)
                .send(`image url is required`);
    }
    
    const is_image = image_url.match(/(https?:\/\/.*\.(?:png|jpg))/i) != null; 
    if(! is_image ){
      return res.status(400)
                .send('the url must be an image .png or .jpg');
    }


    //    2. call filterImageFromURL(image_url) to filter the image
    filterImageFromURL(image_url).then(function(filteredpath){
      //    3. send the resulting file in the response
      res.status(200).sendFile(filteredpath);
    });

    //    4. deletes any files on the server on finish of the response
    onFinished(res, () => {
      emptyFileDir(); 
    });


  });  

  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();