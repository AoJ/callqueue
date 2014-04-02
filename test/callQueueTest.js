var callQueue = require("../lib/callQueue.js");



module.exports = {
	setUp:    function (callback) {
		this.lib = callQueue(require.resolve("./files/exampleLib.js"), ["cbShort", "cbLong", "pid"]);

		callback();
	},

	queue: function (test) {
		test.expect(5);

		var run = this.lib.run;

		var log = [];

		run.cbLong(2, function (err, a) {
			test.equals(a, 2);
			log.push(a);
		});

		run.cbShort(3, function (err, a) {
			test.equals(a, 3);
			log.push(a);
		});

		run.cbShort(4, function (err, a) {
			test.equals(a, 4);
			log.push(a);
		});

		run.cbShort(1, function (err, a) {
			test.equals(a, 1);
			log.push(a);
		});

		this.lib.once("stop", function () {
			test.deepEqual(log, [2, 3, "fail", 4, 1]);
			test.done();
		});

		this.lib.stop();
	},

	stop: function (test) {
		test.expect(1);

		var run = this.lib.run;

		run.pid(function (err, pidA) {

			this.lib.restart();
			setTimeout(function () {
				run.pid(function (err, pidB) {
					test.notEqual(pidA, pidA);
					test.done();
					this.lib.stop();
				}.bind(this))
			}.bind(this), 40);

		}.bind(this));
	}
};