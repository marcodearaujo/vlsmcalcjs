var Assert      = require("./Assert.js");
var NetworkTest = require("./NetworkTest.js");
var SubnetTest  = require("./SubnetTest.js");

Assert.AddTest(NetworkTest);
Assert.AddTest(SubnetTest);
Assert.Run();