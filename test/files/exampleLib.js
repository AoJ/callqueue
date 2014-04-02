var pid = process.pid;

exports.cbShort = function (a, cb) {
	setTimeout(function () {
		cb(null, a);
	}, 30);
};

exports.cbLong = function (a, cb) {
	setTimeout(function () {
		cb(null, a);
	}, 100);
};

exports.pid = function (cb) {
	cb(null, pid);
};