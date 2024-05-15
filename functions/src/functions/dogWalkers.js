const { app } = require('@azure/functions');
const mssql = require('mssql');

const config = {
  // Replace with your actual SQL connection string details retrieved securely
  server: 'admin-waggly.database.windows.net',
  user: 'server-admin-waggly',
  password: 'Wag881!!',
  database: 'waggly',
};

const insertWalker = async (request) => { 
  try { 
    const pool = await sql.connect(config); 
    const result = await pool.request() 
      .input('yourname', sql.NVarChar, request.yourname) 
      .input('email', sql.NVarChar, request.email) 
      .input('town', sql.NVarChar, request.town) 
      .input('postcode', sql.NVarChar, reuqest.postcode)
      .query('INSERT INTO [dbo].[dogWalkers] (yourname, email, town, postcode) VALUES (@yourname, @email, @town. @postcode);'); 
    console.log("Your Dog Walker ID is: ", result.recordset[0].id); 

    return { body: `Hello, ${yourname}, we've recieved your request, your dog walker ID is, ${result.recordset[0].id} !` };

  } catch (err) { 
    console.log("Error inserting information for dog walker, try again: ", err); 
  } 
}

app.http('dogWalkers', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    if (request.method === 'POST') {
      // Access form data from request body (assuming string data)
      const data = await request.text();

      // Parse the data (assuming data is URL-encoded)
      const formData = new URLSearchParams(data);

      const yourname = formData.get('yourname') || 'No name supplied';
      const email = formData.get('email') || 'No email supplied';
      const town = formData.get('town') || 'No town supplied';
      const postcode = formData.get('postcode') || 'No postcode supplied';

      return { body: `Hello, ${yourname}, we've recieved your request!` };
    } else {
      // Handle GET requests differently if needed
      return { body: 'This function expects a dog walker submission request.' };
    }
  }
});



