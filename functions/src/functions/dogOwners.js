const { app } = require('@azure/functions');

app.http('dogOwners', {
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
      
            const response = await addWalkerToDB(dogWalker);
      
            return { body: response };
      
          } else {
            // Handle GET requests differently if needed
            return { body: 'This function expects a dog walker submission request.' };
          }
    }
});
