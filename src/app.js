const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid, validate } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const newRepo = {id:uuid(), title,url,techs,likes:0 };
  
  repositories.push(newRepo);

   return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const {title,url,techs} = request.body;
  const {id} = request.params;

   
  if(!validate(id)){
   return response.status(401).json({error:'Id is not uuid'})
  }

  function updateRepositorie(element){
    if(element.id === id){
      
      if(title !== undefined)
        element.title = title;
      
      if(url !== undefined)
        element.url = url;      
      
        if(techs !== undefined)
          element.techs = techs;
      

      return response.json(element);
    }

  }
  
  repositories.forEach(updateRepositorie);


});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
