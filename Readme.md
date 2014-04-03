# callQueue [![Build Status](https://travis-ci.org/AoJ/callqueue.svg?branch=master)](https://travis-ci.org/AoJ/callqueue)

provide easy way to run one command at a time. Prepared for cron and longtime jobs with 1-size pipeline.

## Install
    npm install callqueue --save
    
## Use
```javascript
var sendEmails = callQueue(require.resolve("./lib/sendEmails.js"), ["method1", "method2"]);
...
["email1", "email2"].forEach(function(type) {
  sendEmails.method1(type, function(err, result) {
      
  });
});
```
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
