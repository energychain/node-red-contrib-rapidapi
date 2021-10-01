module.exports = function(RED) {
  function RapidAPIConfigNode(n) {
    RED.nodes.createNode(this, n);
    var node = this;

    node.config = {
      host: node.credentials.host,
      key: node.credentials.key
    };
  }


    function RapidAPINode(config) {
        RED.nodes.createNode(this,config);
        const axios = require("axios");
        var node = this;
        node.on('input', async function(msg) {
          let rapidapiconfig = RED.nodes.getNode(config.account);
          let options = {
              method: config.method,
              url: config.url,
              headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': rapidapiconfig.config.host,
                'x-rapidapi-key': rapidapiconfig.config.key
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
         account: {type:"rapidapi-config"}
     }
   });
   RED.nodes.registerType("rapidapi-config", RapidAPIConfigNode, {
       credentials: {
           host: {type:"text"},
           key: {type:"text"}
       }
     });
}
