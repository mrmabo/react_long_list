const express = require('express')
const csv  = require('csvtojson/v2')
const app = express()
const port = 3000
const csvFilePath = './data/sample.csv'

// cross domain
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// getlist api
app.get('/getlist', (req, res) => {
  csv({
    noheader: false,
    headers: ['index','id','Time','Content','Category'],
    flatKeys:true
  })
    .fromFile(csvFilePath)
    .preRawData((csvRawData)=>{
      return csvRawData;
    })
    .preFileLine((fileLineString, index)=>{
        return index + ', ' +fileLineString
    })
    .subscribe((jsonObj,index)=>{
      let newCategory = ''
      for(var i = 6; i <= 15; i++){
        if(jsonObj['field'+i] != ''){
          newCategory = newCategory == '' ? newCategory += jsonObj['field'+i] : newCategory += ', '+jsonObj['field'+i]
        }
      }
      return new Promise((resolve,reject)=>{
        if(jsonObj.Category == '') {
          jsonObj.Category = newCategory;
        } else {
          if(newCategory != ''){
            jsonObj.Category += ', '+newCategory;
          }
        }
        resolve();
      })
    })
    .then((jsonObj)=>{
        res.send(jsonObj)
    })
  
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))