const request = require("supertest");

const server = require("./server.js");

describe("GET /cars", ()=>{
  it("Should return a 200 OK",()=>{
    return request(server) //start the server
      .get("/cars")
      .then(res=>{
        expect(res.status).toBe(200);
      })
  })

  it("Should return a JSON", ()=>{
    return request(server)
      .get("/cars")
      .then(res => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it("Should return an array", ()=>{
    return request(server)
      .get("/cars")
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
})


describe("DELETE /cars", ()=>{
  it("Add a new test car and delete it",()=>{
    return request(server)
      .post("/cars")
      .send({
        "VIN": "VIN_test",
        "make": "make_test",
        "model": "model_test",
        "mileage": 1010
      })
      .then(res=>{
        // console.log("This is the post response",res.body);
        expect(res.body.VIN).toBe("VIN_test");  
        const id =  res.body.id  
        return request(server)
          .delete(`/cars/${id}`)
          .then(res=>{
            // console.log("This is the del response",res.body);
            expect(res.body).toBe(`Vehicle with id ${id} has been deleted`);  
            expect(res.status).toBe(200);
          })
     })
  })
})