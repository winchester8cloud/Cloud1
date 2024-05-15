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
      let name, email, town, postcode;

      if (request.headers['content-type'] === 'application/json') {
        try {
          const data = await request.json(); // Assuming JSON data for POST requests
          name = data?.name;
          email = data?.email;
          town = data?.town;
          postcode = data?.postcode;
        } catch (error) {
          console.error('Error parsing JSON request body:', error);
          return {
            body: 'Error processing request, please ensure data is in valid JSON format.'
          };
        }
      } else {
        // Handle form data parsing if needed (use request.query or FormData)
        name = request.query?.get('name') || 'No name';
        email = request.query?.get('email') || 'No email';
        town = request.query?.get('town') || 'No town';
        postcode = request.query?.get('postcode') || 'No postcode';
      }

      // Database interaction (replace with your actual logic)
      const databaseResponse = await addWalkerToDatabase(name, email, town, postcode);

      if (databaseResponse.success) {
        return { body: `Hello, ${name}!, information submitted successfully!` };
      } else {
        console.error('Error adding walker to database:', databaseResponse.error);
        return { body: 'Error submitting information, please try again!' };
      }
    } else {
      // Handle GET requests if needed
      return { body: 'This endpoint only accepts POST requests for dog walker information.' };
    }
  }
});

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
