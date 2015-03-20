var callQueue = require("../lib/callQueue.js");



module.exports = {
	setUp: function (callback) {
		this.exampleLib = callQueue(require.resolve("./files/exampleLib.js"), ["cbShort", "cbLong", "pid"]);

		callback();
	},

	tearDown: function (callback) {
		callback()
	},

	queue: function (test) {
		test.expect(5);

		var exampleLib = this.exampleLib;

		var log = [];

		exampleLib.cbLong(2, function (err, a) {
			test.equals(a, 2);
			log.push(a);
		});

		exampleLib.cbShort(3, function (err, a) {
			test.equals(a, 3);
			log.push(a);
		});

		exampleLib.cbShort(4, function (err, a) {
			test.equals(a, 4);
			log.push(a);
		});

		exampleLib.cbShort(1, function (err, a) {
			test.equals(a, 1);
			log.push(a);
		});

		exampleLib.once("stop", function () {
			test.deepEqual(log, [2, 3, 4, 1]);
			test.done();
		});

		exampleLib.stop();
	},

	stop: function (test) {
		test.expect(1);

		var exampleLib = this.exampleLib;

		exampleLib.pid(function (err, pidA) {

			exampleLib.restart();
			setTimeout(function () {
				exampleLib.pid(function (err, pidB) {
					test.notEqual(pidA, pidB);
					test.done();
					exampleLib.stop();
				})
			}, 40);

		}.bind(this));
	},

	timeout: function (test) {

		var exampleLib = callQueue(require.resolve("./files/exampleLib.js"), ["cbShort", "cbLong", "pid"], {timeout: 2});
		test.expect(1);


		exampleLib.cbLong(1, function (err) {
			test.deepEqual(err, {});
			test.done();
			exampleLib.stop();
		}.bind(this));
	}
};