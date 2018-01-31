var Component = require("pipertron").Component;
var request = require("request");

var httpStatusBodyResponse = new Component({name:"HTTP_STATUS_AND_BODY_RESPONSE", token:"HTTP_STATUS_AND_BODY_RESPONSE", expression:"httpStatusAndBodyResponseExpression", args:["WHITE_SPACE", "json", "optionalWhiteSpace"], action: function(yy, obs, pipe, white, token, white, requestInfo){
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
        if(response){
          resolve([response.statusCode, respBody]);
        }
        else {
          resolve([undefined, undefined, err]);
        }
      });
    });
  });
}});

module.exports = {
  component:httpStatusBodyResponse,
  dependencies:{}
};
