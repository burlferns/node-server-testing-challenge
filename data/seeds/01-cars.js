
exports.seed = function(knex) {
  return knex('cars')
    .truncate()
    .then(function () {
      return knex('cars').insert([
        {VIN:'A123', make:"Toyota", model:"Corolla", mileage:15, "transmission type":"manual"},
        {VIN:'B456', make:"Honda", model:"Accord", mileage:36, "transmission type":"automatic", title:"lease"}, 
        {VIN:'C789', make:"BMW", model:"Series 2", mileage:41376, "transmission type":"automatic", title:"clean"}
      ]);
    });
};
