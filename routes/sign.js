var express = require('express');
var router = express.Router();

/* GET sign page. */
router.get('/', function(req, res, next) {
// the info for what each column is in the table
  let tableHeaders = ["Name", "City", "State", "Details"];

  // seeding the prior data
  // this is the table being passed to the page
  const signatures = [
    { name: "Alice Johnson", email: "alice@email.com", city: "Seattle", state: "WA", signerType: "Student", conditionalInformation: "Academic Level: Senior", comment: "" },
    { name: "Bob Smith", email: "bob@email.com", city: "Portland", state: "OR", signerType: "Faculty", conditionalInformation: "Role: Professor", comment: "" }
  ];      

  res.render('sign', { title: 'Sign', headers:  tableHeaders, signers: signatures});
  
});

router.post('/', (req, res) => {


  /*
    TODO:
    - Get all info entered from form
    - validate it
    - Put/format it in a table row 
    - add it to table
  
  */
})



module.exports = router;
