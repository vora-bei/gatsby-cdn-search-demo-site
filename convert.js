const sql3 = require('better-sqlite3');
const   db = new sql3( './data/mydb.sqlite' );
const  csv = require('csv-parser');
const   fs = require('fs');

// create table

//db.exec( 'DROP TABLE cars;' );

db.exec( `CREATE TABLE IF NOT EXISTS cars 
(id INTEGER, year INTEGER, make TEXT, model ,trim TEXT, body TEXT, transmission TEXT, vin TEXT, state TEXT,condition INTEGER, odometer INTEGER,color TEXT, interior TEXT, seller TEXT,mmr TEXT, sellingprice REAL);` );

const insrow = db.prepare( `insert into cars (id, year,make,model,trim,body,transmission,vin,state,condition,odometer,color,interior,seller,mmr,sellingprice  ) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` );
const insertMany = db.transaction((results) => {
  results.forEach(r=>insrow.run(...r));
});
let id = 1;
let subResults=[];
fs.createReadStream('./data/car_prices.csv')
  .pipe(csv({"separator":","}))
  .on('data', (row) => {
    const fields = ['year','make','model','trim', 'body','transmission','vin','state','condition','odometer','color','interior','seller','mmr','sellingprice']
    subResults.push([id++, ...fields.map(f=> row[f]) ]);
    if(id%100){
      insertMany(subResults);
      subResults=[];
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    db.close();
  });