const { app } = require('@azure/functions');

app.http('dogWalkers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const yourname = request.query.get('yourname') || await request.text() || 'No name supplied';
        const email = request.query.get('email') || await request.text() || 'No email supplied';
        const town = request.query.get('town') || await request.text() || 'No town supplied';
        const postcode = request.query.get('postcode') || await request.text() || 'No postcode supplied';


        return { body: `Hello, ${yourname}, we've recieved your request!` };

    }
});