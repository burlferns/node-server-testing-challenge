// Import Express and external middleware
const express = require('express');

// Import Express middleware
const router = express.Router();

// Import database access
const knex = require('../data/dbConfig');


//Import custom middleware
const {validateCarData} = require('../middleware/custom');

// ********************************************************
// GET /cars
// ********************************************************
router.get('/', (req, res) => {
  knex
    .select("*")
    .from("cars")
    .then(cars=>{
      res.status(200).json(cars)
    })
    .catch(err=>{
      console.log("In GET /cars & error is:",err);
      res.status(500).json({errorMessage: "Error getting the cars"});
    })
}); 


// ********************************************************
// GET /cars/:id
// ********************************************************
router.get('/:id', (req,res)=>{
  knex
    .select("*")
    .from("cars")
    .where({ id:req.params.id })
    .first() // equivalent to accts[0] in the then block below
    .then(cars=>{
      // console.log("In GETS /cars/:id & cars is:",cars);
      if(cars) {
        res.status(200).json(cars);
      }
      else {
        res.status(400).json({ message: "invalid car id" });
      }     
    })
    .catch(err=>{
      console.log("In GET /cars/:id & error is:",err);
      res.status(500).json({errorMessage: "Error getting the car"});
    })
})



// ********************************************************
// POST /cars
// ********************************************************
router.post('/', validateCarData, (req, res) => {
  knex("cars")
    .insert(req.body, "id")
    .then(ids=>{   //This returns the id of the new entry
      // console.log("In POSTS /cars & ids is:",ids);

      // When you have a nested promise you put it in a return 
      // is what the instructor said. Then I think you need only one catch block
      return knex("cars")
        .select("*")
        .where({ id:ids[0] })
        .first()  // When the promise is resolved it will return an array of 1 item. This says to use the first element in the array
        .then(car=>{
          res.status(201).json(car);
        })

    })
    .catch(err=>{
      console.log("In POSTS /cars & error is:",err);
      res.status(500).json({errorMessage: "Error adding the car"});
    })
});


// ********************************************************
// DELETE /cars/:id
// ********************************************************
router.delete('/:id', (req,res)=>{
  knex("cars")
    .where('id','=',req.params.id)
    .del()
    .then(count=>{
      if(count==1) {
        res.status(200).json(`Vehicle with id ${req.params.id} has been deleted`);
      }
      else {
        res.status(400)
          .json({error: `Cannot find vehicle with id ${req.params.id} in database`});
      }
    })
    .catch(err=>{
      console.log("Error in DELETE /cars/:id");
      res.status(500)
          .json({error: "Vehicle could not be deleted."});
    })

})





// ********************************************************
// ********************************************************
module.exports = router;