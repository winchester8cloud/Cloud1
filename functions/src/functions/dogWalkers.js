const { app, output } = require('@azure/functions');
const crypto = require('crypto');

const sendToSql = output.sql({
  commandText: 'dbo.dogWalkers',
  connectionStringSetting: 'SqlConnectionString',
});

app.http('dogWalkers', {
  methods: ['GET', 'POST'],
  extraOutputs: [sendToSql],
  handler: async (request, context) => {
    try {
      context.log(`Http function processed request for url "${request.url}"`);

      const yourname = request.query.get('yourname') || (await request.text());
      const email = request.query.get('email') || (await request.text());
      const town = request.query.get('town') || (await request.text());
      const postcode = request.query.get('postcode') || (await request.text());

      if (!yourname) {
        return { status: 404, body: 'Missing required data' };
      }

      // Stringified array of objects to be inserted into the database
      const data = JSON.stringify([
        {
          // create a random ID
          id: crypto.randomUUID(),
          name: yourname,
          email: email,
          town: town,
          postcode: postcode
        },
      ]);

      // Output to Database
      context.extraOutputs.set(sendToSql, data);

      const responseMessage = name
        ? 'Hello, ' +
          yourname +
          '. This HTTP triggered function executed successfully.'
        : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

      // Return to HTTP client
      return { body: responseMessage };
    } catch (error) {
      context.log(`Error: ${error}`);
      return { status: 500, body: 'Internal Server Error' };
    }
  },
});