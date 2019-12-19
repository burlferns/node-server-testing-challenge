
// ********************************************************
// validateCarData
// ********************************************************
function validateCarData(req, res, next) {
  const body = req.body;
    if(Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing car data" });
    } 
    else if(!body.VIN) {
      res.status(400).json({ message: "missing required VIN field" });
    } 
    else if(!body.make) {
      res.status(400).json({ message: "missing required make field" });
    } 
    else if(!body.model) {
      res.status(400).json({ message: "missing required model field" });
    } 
    else if(!body.mileage) {
      res.status(400).json({ message: "missing required mileage field" });
    } 
    else {
      next();
    }
}


// ********************************************************
// defaultResponse
// ********************************************************
function defaultResponse(req,res) {
  res.status(404).send(`<h1>You have used an unsupported URL</h1>`)
}


// ********************************************************
// logger
// ********************************************************
function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} ${req.originalUrl}`);
  next();
}


// ********************************************************
// ********************************************************
module.exports = {defaultResponse, logger, validateCarData};