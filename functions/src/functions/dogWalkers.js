const { app } = require('@azure/functions');
const mssql = require('mssql');

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

      // Prepare SQL statement with parameters to prevent SQL injection
      const sql = `INSERT INTO dogWalkers (name, email, town, postcode) VALUES (@name, @email, @town, @postcode)`;
      const request = await pool.request()
        .input('name', yourname)
        .input('email', email)
        .input('town', town)
        .input('postcode', postcode);

      // Execute the SQL statement
      await request.query();

      pool.close();

      return { body: `Hello, ${yourname}, we've recieved your request!` };
    } else {
      // Handle GET requests differently if needed
      return { body: 'This function expects a POST request.' };
    }
  }
});

