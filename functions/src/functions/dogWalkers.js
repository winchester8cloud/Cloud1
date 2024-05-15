const { app, output } = require('@azure/functions');
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

app.http('dogWalkers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        if (req.method === 'POST') {
          const infoWalker = req.body;
      
          if (infoWalker) {
            try {
              // To DB
              const response = await addWalkerToDatabase(infoWalker);
              return { response };}
            catch {
              return {body: "Database function didn't run."};
            }
          }

          return {body: "No information passed."};
    }
}});

const addWalkerToDatabase = async (infoWalker) => { 
  try { 
    const pool = await sql.connect(config); 
    const result = await pool.request() 
      .input('name', sql.NVarChar, infoWalker.name) 
      .input('email', sql.NVarChar, infoWalker.email) 
      .input('town', sql.NVarChar, infoWalker.town) 
      .input('postcode', sql.NVarChar, infoWalker.postcode) 
      .query('INSERT INTO [dbo].[dogWalkers] (name, email, town, postcode) VALUES (name, @email, @town, @postcode);'); 
    return { body: 'Your information has been successfully submitted!' };
  } catch (err) { 
    console.log(err); 
    return { body: 'Your information has not been successfully submitted, please try again!' };
  } 
}
