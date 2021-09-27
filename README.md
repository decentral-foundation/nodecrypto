# How to use

Run the server

  1. In console `node src/app/server.js 0 100` and expect message that its running on port. You can also run `node src/app/server.js -p 3500 0 100` to customize port

2. In a new console run `curl http://localhost:3000/` and expect to see an Info Message about the API

3. **Create:** Then without file extension do 

```zsh
curl 'http://localhost:3000/v0/create/alice-32523' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H "Content-Type: application/x-www-form-urlencoded" 
``` 

and you can check the `store` directory to create that file

4. **Protect:** Then verify with this

```zsh
curl 'http://localhost:3000/v0/protect/alice-32526' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'name=draymond&skill=archery&password=deaba315ababa315adeaa315deabafed'
```

5. **View:** Another option 

```zsh
curl 'http://localhost:3000/v0/view/alice-32523' \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"protect","params":[],"id":0}'
```



6. **Unlock:** Unlock with the following

```zsh
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" http://localhost:3000/v0/unlock/alice-32523
```


```zsh
curl 'http://localhost:3000/v0/unlock/alice-32526' \
-X PUT \
-H 'Connection: keep-alive' \
-H 'Pragma: no-cache' \
-d 'name=draymond&skill=archery&password=defba315ababa315ababa315ababafed'
```

7. **View:** View file

```zsh
curl 'http://localhost:3000/v0/view/alice-32523'
```


```zsh
curl 'http://localhost:3000/v0/view/alice-32523' \
-X POST \
-H "Content-Type: application/json" 
```

8. **Test:** This is optional

```zsh
curl 'http://localhost:3000/v0/updates' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d '{"jsonrpc":"2.0","method":"updates","params":[],"id":0}'
```

9. **Experimental:** Upgraded version of encrypt which needs to have the enc dec key be sent as part of jsonrpc request

```zsh
curl 'http://localhost:3000/v1/protect/myfilename' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'defba315ababa315ababa315ababafed'
```

10. **Experimental:** Decryption version of above

```zsh
curl 'http://localhost:3000/v1/unlock/myfilename' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'defba315ababa315ababa315ababafed'
```

11. **Experimental:** Writing a new file

```zsh
curl 'http://localhost:3000/v1/create/bob-349485' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'defba315ababa315ababa315ababafed'
```

12. **Experimental:** Viewing new file

```zsh
node test/readerstream.js '/d' init myetherfile.md 324234_266268
```

13. **Experimental:** Test writing with promise based pattern

```zsh
node test/writerstream.js '/d' init myetherfile.md 84935_484837
```


# How to run this



```zsh
cd src
node aes.js encrypt file.txt helloworldHelloWorld
node aes.js decrypt file.txt.enc helloworldHelloWorld
```




## Variations


```zsh
node aes.js encrypt file.md helloWorld
```

```zsh
node aes.js decrypt file.md.enc helloWorld
```

---

Another variation could be

```zsh
node src/test.js
```


## How to test

```zsh
cd test
```

```zsh
node readerstream.js
```


