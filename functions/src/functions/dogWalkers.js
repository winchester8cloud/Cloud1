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

const { app } = require('@azure/functions');

app.http('dogWalkers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        if (req.method === 'POST') {
          const body = req.body;
      
          if (body) {
            try {
              const { name, email, town, postcode } = body;
      
              // You might want to add data validation here
      
              // Replace with your actual database connection logic (e.g., using a SQL library)
              const response = await addWalkerToDatabase(name, email, town, postcode);
              return { response };}
            catch {
              return {"Database function didn't run."}
            }
          }

    }
});

const addWalkerToDatabase = async (name, email, town, postcode) => { 
  try { 
    const pool = await sql.connect(config); 
    const result = await pool.request() 
      .input('name', sql.NVarChar, name) 
      .input('email', sql.NVarChar, email) 
      .input('town', sql.NVarChar, town) 
      .input('postcode', sql.NVarChar, postcode) 
      .query('INSERT INTO [dbo].[dogWalkers] (name, email, town, postcode) VALUES (name, @email, @town, @postcode);'); 
    return { body: 'Your information has been successfully submitted!' };
  } catch (err) { 
    console.log(err); 
    return { body: 'Your information has not been successfully submitted, please try again!' };
  } 
}
