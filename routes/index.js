const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

/* GET home page */
// cRud: Route GET "/company/anId"
router.get("/", (req, res, next) => {
  let start = new Date();
  Company.find()
    .sort({name: 1}) //when we add a new element it is not added in last place but in the sorted place
    .limit(1000) 
    .then(companiesFromDb => {
      let end = new Date();
      console.log("Diff in ms:", end - start);
      res.render("index", { companies: companiesFromDb });
    });
});

// cRud: Route GET "/company/:companyId" to display the detail
// Example: http://localhost:3000/company/52cdef7c4bab8bd675297d94
router.get("/company/:companyId", (req, res, next) => {
  let companyId = req.params.companyId
  Company.findById(companyId)
    .then(company => {
      res.render("company-detail", { company: company });
    })
});

// cruD: Route GET "/delete-company/:companyId" to delete one company
router.get("/delete-company/:companyId", (req, res, next) => {
  let companyId = req.params.companyId
  Company.findByIdAndDelete(companyId)
    .then(company => {
      res.redirect("/");
    })
});

//Crud: Route GET  "/add-company"
router.get("/add-company", (req, res, next) => {
  res.render("add-company");
});

//Crud: Route POST "/add-company"
router.post("/add-company", (req, res, next) => {
  let company_name = req.body.name;
  let number_of_employees = req.body.number_of_employees;
  Company.create({
    name: company_name,
    number_of_employees: number_of_employees,
    description: description
  }).then( company => { res.redirect("/") });
});

//crUd: Route 
router.get("/edit-company/:companyId", (req, res, next) => {
  Company.findById(req.params.companyId).then( company => {
    res.render("edit-company", {company});
  });
});  

router.post("/edit-company/:companyId", (req, res, next) =>  {
  let companyId = req.params.companyId;
  let {name, number_of_employees, description} = req.body;
  Company.findByIdAndUpdate(companyId, { name, number_of_employees, description}).then(
    company =>{res.redirect("/company/"+companyId)} );
});
 

module.exports = router;
