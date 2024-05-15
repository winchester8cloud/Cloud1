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

  } 
};

app.http('dogWalkers', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  extraOutputs: [sendToSql],
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    if (request.method === 'POST') {
      // Data form
      const data = await request.text();

      // Decode this
      const formData = new URLSearchParams(data);

      const name = formData.get('name') || 'No name supplied';
      const email = formData.get('email') || 'No email supplied';
      const town = formData.get('town') || 'No town supplied';
      const postcode = formData.get('postcode') || 'No postcode supplied';

      const dogWalker = { 
        name, 
        email, 
        town,
        postcode 
      }; 

      const response = await addWalkerToDB(dogWalker);
      return response;

    } else {
      return { body: 'This function expects a dog walker submission request.' };
    }
  }
});
 
const addWalkerToDB = async (dogWalker) => { 
  try { 
    const pool = await sql.connect(config); 
    const result = await pool.request() 
      .input('name', sql.NVarChar, dogWalker.name) 
      .input('email', sql.NVarChar, dogWalker.email) 
      .input('town', sql.NVarChar, dogWalker.town) 
      .input('postcode', sql.NVarChar, dogWalker.postcode) 
      .input('id', result.recordset[0].id)
      .query('INSERT INTO [dbo].[dogWalkers] (id, name, email, town, postcode) VALUES (@id, @name, @email, @town, @postcode);'); 
    await addWalkerToDB(dogWalker);
    return { body: 'Your information has been successful submitted!' };
  } catch (err) { 
    console.log(err); 
    return { body: 'Your information has not been successful submitted, please try again' };
  } 
}
