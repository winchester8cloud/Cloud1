const { app } = require('@azure/functions');

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
      return { body: 'This function expects a POST request.' };
    }
  }
});