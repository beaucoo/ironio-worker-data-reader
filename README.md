#Description

Read config or [payload](http://dev.iron.io/worker/reference/payload/) files in an Iron.io worker.


##Use

<pre>
<code>
    var reader = require('ironio-worker-data-reader');
    var fallback = null; // Optional relative file path useful during development

    // Reads the -config file, else the fallback during dev
    var rawConfigStr = reader.readConfig(fallback);

    // Reads the -config file, else the fallback during dev
    var configJson = readConfigJson(fallback);

    // Reads the -config file, else the fallback during dev
    var rawPayloadStr = readPayload(fallback);


    // Reads the -payload file, else the fallback during dev
    var payloadJson = readPayloadJson(fallback);

    // Reads the -payload file, else the fallback during dev
    var rawStr = read("PARAMNAME", fallback);

    // Reads the -config file, else the fallback during dev
    var json = readJson("PARAMNAME", fallback);
</code>
</pre>

##Release Notes
v2.0.0 First public release

##Running Tests

* Run 'npm test'
* or run `mocha test --require must --reporter spec --recursive`


##License
(The MIT License)

Copyright (c) 2013-20* BeauCoo Technologies Inc. <info@beaucoo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

