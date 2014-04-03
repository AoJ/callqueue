var workerFarm = require('worker-farm');
var util = require("util");
var usage = require('usage');
var errno = require('errno');
var _ = require("lodash");

var error = errno.custom.createError('supervisor errors');
var errorNotUnique = errno.custom.createError("Methods names are not unique", error);
var errorDontExists = errno.custom.createError("Method don't exists", error);


var start = function (libPath, methods, options) {
	return workerFarm({
		maxCallsPerWorker: -1,
		maxConcurrentWorkers: options.workers,
		maxConcurrentCallsPerWorker: options.parallelPerWork,
		maxConcurrentCalls: -1,
		maxCallTime: options.timeout
	}, libPath, methods);
};


var app = function (libPath, methods, options) {
	this.debounce = null;
	this.libPath = require.resolve(libPath);
	this.methods = methods;
	this.options = {
		workers: options.workers || 1,
		parallelPerWork: options.parallelPerWork || 1,
		timeout: options.timeout || 0
	};
	this.workers = start(this.libPath, this.methods, this.options);
	this.run = {};

	methods.forEach(function (method) {
		if (this.run[method]) throw new errorNotUnique("Method " + method + " not unique");
		this.run[method] = function () {
			this.runIt.call(this, method, arguments);
		}.bind(this);
	}.bind(this));
};

util.inherits(app, require('events').EventEmitter);



app.prototype.restart = function () {
	if (this.debounce) clearTimeout(this.debounce);
	this.debounce = setTimeout(function () {
		this.stop();
		this.workers = start(this.libPath, this.methods, this.options);
		this.emit("restart");
	}.bind(this), 20);
};


app.prototype.stop = function () {
	workerFarm.end(this.workers, function () {
		this.emit("stop");
	}.bind(this));
};


app.prototype.runIt = function (method, args) {
	if (this.workers[method] === undefined) throw new errorDontExists("method " + method + " don't exists or don't configured yet");
	var r = this.workers[method].apply(this, args);
	this.emit("run", method, args);
	return r;
};


app.prototype.usage = function (cb) {
	var pids = workerFarm.list(this.workers);
	var usages = [];

	pids.forEach(function (pid) {
		usage.lookup(pid, function (err, result) {
			usages.push({pid: pid, usage: result, err: err});
			if (pids.length === usages.length) cb(usages);
		})
	})
};


module.exports = exports = function (libPath, methods, options) {
	return new app(libPath, methods, options || {});
};