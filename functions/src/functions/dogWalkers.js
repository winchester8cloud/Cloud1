const { app } = require('@azure/functions');
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
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    if (request.method === 'POST') {
      // Data form
      const data = await request.text();

      // Decode this
      const formData = new URLSearchParams(data);

      const yourname = formData.get('yourname') || 'No name supplied';
      const email = formData.get('email') || 'No email supplied';
      const town = formData.get('town') || 'No town supplied';
      const postcode = formData.get('postcode') || 'No postcode supplied';

      const dogWalker = { 
        yourname, 
        email, 
        town,
        postcode 
      }; 
      
      const addWalkerToDB = async (dogWalker) => { 
        try { 
          const pool = await sql.connect(config); 
          const result = await pool.request() 
            .input('yourname', sql.NVarChar, dogWalker.yourname) 
            .input('email', sql.NVarChar, dogWalker.email) 
            .input('town', sql.NVarChar, dogWalker.town) 
            .input('postcode', sql.NVarChar, dogWalker.postcode) 
            .input('id', result.recordset[0].id)
            .query('INSERT INTO [dbo].[dogWalkers] (id, yourname, email, town, postcode) VALUES (@id, @yourname, @email, @town, @postcode);'); 
          return { body: 'Your information has been successful submitted!' };
        } catch (err) { 
          console.log(err); 
        } 
      }

      await addWalkerToDB(dogWalker);

      return { body: 'Your information has been successful submitted!' };

    } else {
      // Handle GET requests differently if needed
      return { body: 'This function expects a dog walker submission request.' };
    }
  }
});
 



