var express = require('express');
var router = express.Router();

let signatures = [
    { name: "Alice Johnson", email: "alice@email.com", city: "Seattle", state: "WA", signerType: "Student", conditionalInformation: "Academic Level: Senior", comment: "" },
    { name: "Bob Smith", email: "bob@email.com", city: "Portland", state: "OR", signerType: "Faculty", conditionalInformation: "Role: Professor", comment: "" }
  ];   

/* GET sign page. */
router.get('/', function(req, res, next) {
// the info for what each column is in the table
  let tableHeaders = ["Name", "City", "State", "Details"];

  res.render('sign', { title: 'Sign', headers:  tableHeaders, signers: signatures});
  console.log("working...");
  
});

router.post('/', (req, res) => {

  /*
    TODO:
    - Get all info entered from form [x]
    - validate it
    - Put/format it in a table row 
    - add it to table
  */

    // fields that get displayed
    let signerName=req.body.name;
    let signerEmail=req.body.email;
    let signerCity=req.body.city;
    let signerState=req.body.state;

    // these end up in the [more] link
    let signerType = req.body.typeUserSelect;
    let moreInfo = [];
    moreInfo.push(signerType);
    
    // the type of user they are determines the info that gets picked up
    switch(signerType) 
    {
      case "Student":
      {
        moreInfo.push(req.body.studentSuboptions);
        moreInfo.push(req.body.studentConditionalInfo);
        break;
      }

      case "Faculty":
      {
        moreInfo.push(req.body.facultySuboptions);
        moreInfo.push(req.body.facultyConditionalInfo);
        break;
      }

      case "Military":
      {
        moreInfo.push(req.body.militaryBranchSuboptions);
        moreInfo.push(req.body.militaryDutySuboptions);
        break;
      }

      case "Professional":
      {
        moreInfo.push(req.body.professionalSuboptions);
        moreInfo.push(req.body.professionalConditionalInfo);
        break;
      }

      case "Other":
      {
        moreInfo.push(req.body.otherTextInput)
        break;
      }
    }
    
    moreInfo.push(req.body.leaveComment)
    
    // front facing details, everything else is pushed to conditionalInfo
    let signerDetails = [signerName, signerEmail, signerCity, signerState]
    
  console.log("Posted");
  res.render('thanks', {title: "thanks", signer: signerDetails, details: moreInfo}); // dummy thank you page to test info is coming through

})

module.exports = router;
