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

      if (request.method === 'POST') {
      const name = request.query.get('name') || await request.text() || 'No name';
      const email = request.query.get('email') || await request.text() || 'No email';
      const town = request.query.get('town') || await request.text() || 'No town';
      const postcode = request.query.get('postcode') || await request.text() || 'No postcode';

      const response = `Request recieved but not submitted into database, please try again.`

      if (name || email || town || postcode)
        {
          const response = `Hello, ${name}!, response recieved and in database, thank you!`
        }

      return { body: response };
      }
    }
  }
);

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
    return { body: 'Your information has not been successfully submitted, please try again!' };
  } 
}
