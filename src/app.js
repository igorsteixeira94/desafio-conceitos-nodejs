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
   return response.status(400).json();
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
  return response.status(400).json();


});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  if(!validate(id)){
    return response.status(400).json();
  }

  const index = repositories.findIndex(repository => repository.id === id);

  if(index === -1){
    return response.status(400).json();
  }

  repositories.splice(index,1);
  return response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  if(!validate(id)){
    return response.status(400).json();
  }

  function addLike(element){
    if(element.id === id){
      element.likes = element.likes +1;
      return response.json(element);
    }
  }
  repositories.forEach(addLike);
  return response.status(400).json();
});

module.exports = app;
