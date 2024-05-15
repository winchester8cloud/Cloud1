const { app } = require('@azure/functions');
const mssql = require('mssql');

const config = {
  // Replace with your actual SQL connection string details retrieved securely
  server: 'waggly-assignment-server.database.windows.net',
  user: 'admin-waggly',
  password: 'gjrs4t4nSSfw!!',
  database: 'waggly-server',
};

app.http('dogWalkers', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (context, req) => {
    context.log(`Http function processed request for url "${request.url}"`);

    if (req.method === 'POST') {
      // ... (same logic as before to retrieve form data)

      try {
        // Establish connection pool using async/await
        const pool = await mssql.connect(config);

        const sql = `INSERT INTO dogWalkers (name, email, town, postcode) VALUES (@name, @email, @town, @postcode)`;
        const request = await pool.request()
        .input('name', yourname)
        .input('email', email)
        .input('town', town)
        .input('postcode', postcode);

        // Execute the SQL statement
        await request.query();
        pool.close();


        return { body: `Hello, ${yourname}, your information has been submitted!` };
      } catch (error) {
        context.log.error('Error connecting to database:', error);
        return { status: 500, body: 'An error occurred while processing your request.' };
      }
    } else {
      // Handle GET requests differently if needed
      return { body: 'This function expects a POST request.' };
    }
  }
});
