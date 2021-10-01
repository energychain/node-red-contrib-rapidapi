module.exports = function(RED) {
    function RapidAPINode(config) {
        RED.nodes.createNode(this,config);
        const axios = require("axios");
        var node = this;
        node.on('input', async function(msg) {
          let options = {
              method: config.method,
              url: config.url,
              headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': node.credentials.host,
                'x-rapidapi-key': node.credentials.key
              },
              data: msg.payload
          };
          axios.request(options).then(function (response) {
              msg.payload = response.data;
              node.send(msg)
            	console.log(response.data);
            }).catch(function (error) {
            	console.error(error);
          });
        });
    }
    RED.nodes.registerType("RapidAPI",RapidAPINode,{
     credentials: {
         host: {type:"text"},
         key: {type:"text"}
     }
   });
}
