const { app } = require('@azure/functions');

app.http('dogWalkers', {
    module.exports = async function (context, req) {
        context.log('HTTP trigger function processed a request.');
      
        if (req.method === 'POST') {
          const name = req.body.name;
          const email = req.body.email;
          const message = req.body.message;
      
          // Process the form data (e.g., validation, storage)
          console.log(`Received form data: Name: ${name}, Email: ${email}, Message: ${message}`);
      
          context.res = {
            // ... (optionally send a response)
          };
        } else {
          context.res = {
            status: 405,
            body: "This function only accepts POST requests."
          };
        }
      };
});


