const { app } = require('@azure/functions');
const mssql = require('mssql');

const config = {
  // Replace with your actual SQL connection string details retrieved securely
  server: 'admin-waggly.database.windows.net',
  user: 'server-admin-waggly',
  password: 'Wag881!!',
  database: 'waggly',
};

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
      // Get new ID
      const pool = new sql.ConnectionPool(connectionString);
      const result = await pool.query('SELECT TOP 1 [id_column_name] FROM [schema_name].[table_name] ORDER BY [id_column_name] DESC');
      latestId = result.recordset[0]?.[id_column_name];
      latestId = latestId + 1;

      const sql = `INSERT INTO dogWalkers (id, name, email, town, postcode) VALUES (@name, @email, @town, @postcode @latestId)`;
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



