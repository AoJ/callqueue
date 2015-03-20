# callQueue [![Build Status](https://travis-ci.org/AoJ/callqueue.svg?branch=master)](https://travis-ci.org/AoJ/callqueue)

provide easy way to run one command at a time. Prepared for cron and longtime jobs with 1-size pipeline.

## Install
    npm install callqueue --save

## Example
```javascript
var callqueue = require("callqueue");
//you must provide methods names to setup bindings
var sendEmails = callqueue(require.resolve("./lib/sendEmails.js"), ["method1", "method2"]);
...
["email1", "email2"].forEach(function(type) {
  sendEmails.method1(type, function(err, result) {

  });
});
```
Real example see in test dir.

## Usage
```javascript
require("callqueue")(fullLibPath, publicMethods, options);
```

* **<code>fullLibPath</code>** Can be a local lib <code>require.resolve("./lib/sendEmails.js")</code> or a some node module <code>someModule</code>
* **<code>publicMethods</code>** Write out all the lib public methods to expose it. Only these methods can be accesible through the callqueue api. All pubic method must be async and last their argument must be callback(err, results...)
* **<code>options</code>** object
    * <code>timeout</code> in ms, timeouted job rise error in cb function
    * <code>workers</code> set number of parallel workers
    * <code>parallelPerWork</code> number of parallel jobs per worker.
    * <code>retries</code> max number of call requeues after worker termination (unexpected or timeout).


## API
* **<code>restart()</code>** wait for end all jobs and then restart all workers
* **<code>stop()</code>** wait for end all jobs and then stop all workers
* **<code>usage()</code>** return list of <code>{pid: ##, usage: {cpu: ##, memory: ##}}</code> for all running workers
* **<code>{method}(agrs...)</code>** wrapper for call the exposed methods. Args are same as original lib methods.


## Events
callqueue wrapper rising a events.
* **<code>stop</code>** when all workers stopped
* **<code>restart</code>** after restarting all workers
* **<code>run(method, args)</code>** after call some method

## History
- 1.0.1 add options
- 1.0.0 init release

## License

(The MIT License)

Copyright (c) 2014 AoJ &lt;aoj@n13.cz&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
