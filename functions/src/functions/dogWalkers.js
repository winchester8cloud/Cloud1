const { app, output } = require('@azure/functions');
const crypto = require('crypto');

const sendToSql = output.sql({
  commandText: 'dbo.ToDo',
  connectionStringSetting: 'SqlConnectionString',
});

app.http('HttpExample', {
  methods: ['GET', 'POST'],
  extraOutputs: [sendToSql],
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

      const dogWalker = { 
        yourname, 
        email, 
        town,
        postcode 
      }; 

      const datadogWalker = JSON.stringify([
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
      return { body: 'Your information has been successfully submitted!' };

    
      //const response = await addWalkerToDB(dogWalker);
      //return response;

    } else {
      return { body: 'This function expects a dog walker submission request.' };
    }
  }
});

const sendToSql = output.sql({
  commandText: 'dbo.dogWalkers',
  connectionStringSetting: 'SqlConnectionString',
});
 
const addWalkerToDB = async (dogWalker) => { 
  try { 
    const pool = await sql.connect(config); 
    const result = await pool.request() 
      .input('yourname', sql.NVarChar, dogWalker.yourname) 
      .input('email', sql.NVarChar, dogWalker.email) 
      .input('town', sql.NVarChar, dogWalker.town) 
      .input('postcode', sql.NVarChar, dogWalker.postcode) 
      .query('INSERT INTO [dbo].[dogWalkers] (yourname, email, town, postcode) VALUES (@yourname, @email, @town, @postcode);'); 
    //await addWalkerToDB(dogWalker);
    return { body: 'Your information has been successfully submitted!' };
  } catch (err) { 
    console.log(err); 
    return { body: 'Your information has not been successfully submitted, please try again.' };
  } 
}



