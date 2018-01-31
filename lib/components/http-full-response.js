var Component = require("pipertron").Component;
var request = require("request");

var httpFullResponse = new Component({name:"HTTP_FULL_RESPONSE", token:"HTTP_FULL_RESPONSE", expression:"httpFullResponseExpression", args:["WHITE_SPACE", "json", "optionalWhiteSpace"], action: function(yy, obs, pipe, white, token, white, requestInfo){
  return obs.flatMap((body) => {
    var reqInfo = {};
    if(typeof(requestInfo) === "string" && requestInfo.toLowerCase() === "input_from_stream"){
      reqInfo = body;
    } else {
      for(var i in requestInfo){
        reqInfo[i] = requestInfo[i];
      }
      if(requestInfo.method === "POST" || requestInfo.method === "PUT" || requestInfo.method === "PATCH"){
        reqInfo.body = body;
      }

    }

    return new Promise((resolve, reject) => {
      request(reqInfo, (err, response, respBody) => {
        resolve([err, response, respBody]);
      });
    });
  })
}});

module.exports = {
  component:httpFullResponse,
  dependencies:{}
};
