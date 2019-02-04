module.exports = function (plop) {
    
    // create your generators here
    plop.setGenerator('express-route', {
        description: 'express route that connects to a microservice to retrieve data',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your route: ',
            }],
        actions: [{
            type: 'add',
            path: 'routes/{{dashCase name}}.js',
            templateFile: 'plop-templates/express-relay-route.js',
        }]
    });

};
