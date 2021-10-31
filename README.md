# How to use

Ensure serving running on port 5xxx

```zsh
curl localhost:5000/api/notify -vvv
```

> Expect curl repsonse to look similar to Appendix III

## How to use API

1. Assert in `cd /Users/cco/Github/ecies-rest`

2. Run `node devserver` which goes on port 5000



# Scope

We want to be able to get payments for preorders or for digital content purchases.
This server shall be receiving requests from a 35XX server. 

## Outcome 

🦾 If the receiving server is using body parser, we can get the contents from request body printed. 
🙋🏻‍♀️ But what about if the server receives a JPG file? 


- [ ] Task 1.1.0 Usebrowser to invoke AJAX to a server listening 🥒
- [ ] Task 1.1.1 Assert PNG exists in file system 🍑 
- [ ] Task 1.2.1 Read it using this JS library we must send it using JS 🍏
- [ ] Task 1.2.2 So now that its read in memory we can use axios OR we 🍎
- [ ] Task 1.2.2 Read it using this JS library send using curl 🍇

To do item 1.1

```js
let fs = require("fs");
let PNG = require("pngjs").PNG;

fs.createReadStream("in.png")
  .pipe(new PNG({filterType: 4}))
  .on("parsed",function() {
    for (var y = 0;) 
      // look at doc for rest
  })
```





## References

```zsh
echo '{"account":"0x123","filename": "MODIFY_HERE", "password": "updatelatertoseed"}' | gzip | curl -vvv -i --data-binary @- -H "Content-Encoding: gzip" http://localhost:3500/v1/protech/ 
```


### Appendix III

```zsh
% curl localhost:5000/api/notify -vvv | jq "."
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 5000 (#0)
> GET /api/notify HTTP/1.1
> Host: localhost:5000
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 322
< ETag: W/"142-7zyRFup8FKyKUZazQZcovC6Oqf0"
< Date: Tue, 26 Oct 2021 05:43:34 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
{ [322 bytes data]
100   322  100   322    0     0  15333      0 --:--:-- --:--:-- --:--:-- 15333
* Connection #0 to host localhost left intact
* Closing connection 0
{
  "curl_data": "HTTP/1.1 200 OK\r\nX-Powered-By: Express\r\nContent-Type: application/json; charset=utf-8\r\nContent-Length: 25\r\nETag: W/\"19-sk8ULQY45ndZU9lmLRGpc9jYWFo\"\r\nDate: Tue, 26 Oct 2021 05:43:33 GMT\r\nConnection: keep-alive\r\nKeep-Alive: timeout=5\r\n\r\n{\"message\":\"hello world\"}",
  "message": "no issues"
}
```