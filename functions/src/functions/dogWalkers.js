module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');
  
    if (req.method === 'POST') {
      const yourname = req.body.yourname;
      const email = req.body.email;
      const town = req.body.town;
  
      // Process the form data (e.g., validation, storage)
      console.log(`Received form data: Name: ${yourname}, Email: ${email}, Message: ${town}`);
  
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


