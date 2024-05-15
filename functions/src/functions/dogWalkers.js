const { app, output } = require('@azure/functions');
const crypto = require('crypto');
const mssql = require('mssql');

const config = {
  server: 'admin-waggly.database.windows.net',
  user: 'server-admin-waggly',
  password: 'Wag881!!',
  database: 'waggly',
  pool: { 
    max: 100, 
    min: 0, 
    idleTimeoutMillis: 50000 

  }, 
  authentication: {
    type: 'default'
  },
  options: {
      encrypt: true
  }
};

const insertWalker = async (walker) => { 
  try { 
    const pool = await sql.connect(config); 
    const result = await pool.request() 
      .input('name', sql.NVarChar, walker.name) 
      .input('email', sql.NVarChar, walker.email) 
      .input('town', sql.NVarChar, walker.town) 
      .input('postcode', sql.NVarChar, walker.postcode) 
      .query('INSERT INTO [dbo].[dogWalkers] (name, email, town, postcode) VALUES (@name, @email, @town, @postcode);'); 
    console.log("Inserted walker with ID: ", result.recordset[0].id); 
  } catch (err) { 
    console.log("Error inserting walker: ", err); 
  } 
} 

 

app.http('dogWalkers', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (req, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

  const queryString = req.body; 
  const params = new URLSearchParams(queryString); 
  const name = params.get('name'); 
  const email = params.get('email'); 
  const town = params.get('town');
  const postcode = params.get('postcode');  


  const dogWalker = { 

    name, 
    email, 
    town,
    postcode 
  }; 

 
  await insertWalker(walker); 
  context.res = { 
    body: "Walker inserted." 
  }; 
}});