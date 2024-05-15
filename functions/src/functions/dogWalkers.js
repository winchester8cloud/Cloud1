const { app } = require('@azure/functions');
const mssql = require('mssql');

const config = {
  server: 'scripts-waggly-server',
  user: 'server-admin-waggly',
  password: 'gjrs4t4nSSfw!!',
  database: 'dogWalkers.sql',
};

app.http('dogWalkers', {
  methods: ['POST'],
  authLevel: 'anonymous', // Adjust based on your authentication needs
  handler: async (context, req) => {
    context.log('Http function processed request for url "${request.url}"');

    if (req.method === 'POST') {
      // ... (same logic as before to retrieve form data from request body)

      try {
        // Establish connection to SQL database
        let pool = await mssql.connect(config);

        // Prepare SQL statement with parameters to prevent SQL injection
        const sql = `INSERT INTO YourTable (name, email, town, postcode) VALUES (@name, @email, @town, @postcode)`;
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

