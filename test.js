
var Pipertron = require("pipertron").PiperTron;
var {pipeReport, mixinCompCore} = require("pipertron-comp-core");
require("./lib/components/http-full-response");
require("./lib/components/http-status-body");

var libs = {Rx:require("@reactivex/rxjs")}

var parser = Pipertron.buildFromRegistry(libs);
libs.pipertronInstance = parser;

var e = {
  method:"GET",
  uri:"http://www.google.com"
}

pipeReport(e, `| HTTP_FULL_RESPONSE "input_from_stream"`, parser).then((d) => {
  console.log(d);
}).catch((err) => {
  console.log(err);
})
