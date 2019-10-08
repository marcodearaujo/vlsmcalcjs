Assert = /** @class */ (function () {
    function Assert() {
        this.tests = [];
        this.msg = [];
        this.results = [];
    }

    Assert.prototype.AddTest = function(test) {
        this.tests = this.tests.concat(test);
        return this;
    };

    Assert.prototype.Run = function() {
        this.tests.forEach(function(test){
            test();
        });
        this.resume();
    };

    Assert.prototype.AreEqual = function(a, b) {
        areEqual = a === b;
        result = ".";
        if (!areEqual){
            this.msg.push("Test " + arguments.callee.caller.name + " fail: " + a + " are not equal to " + b);
            result = "F";
        }
        this.results.push(result);
    };

    Assert.prototype.IsFalse = function(a) {
        result = ".";
        if (a) {
            this.msg.push("Test " + arguments.callee.caller.name + " fail: Expected false");
            result = "F";
        }
        this.results.push(result);
    };

    Assert.prototype.IsTrue = function(a) {
        result = ".";
        if (!a) {
            result = "F";
            this.msg.push("Test " + arguments.callee.caller.name + " fail: Expected true");
        }
        this.results.push(result);
    };

    Assert.prototype.resume = function() {
        console.log(this.results.join(""));
        if (this.results.length === 0)
            console.log("0 test found");
        else if (this.results.length > 1)
            console.log(this.results.length + " tests");
        else
            console.log("1 test");
        this.msg.forEach(function(e){
            console.log(e);
        });
        if (this.msg.length == 0 && this.results.length > 1) {
            console.log("Tests OK");
        }
    };

    return Assert;
}());

module.exports = new Assert()