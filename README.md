# How to use



## Protocol Definition


## Purpose

Scope: 
Outcome: Create a QR code and or generate an address so that I can accept payments

1. First you creat a file using the v1 api
2. So we know that another server in the DMZ will use a crypto library. They will be listening on 8546. 
3. bar
4. Then decrypt the file the server gets a request but it needs to be able to filter say for example someone else is trying to decrypt your file
  * decision made to add in sessions later
5. It needs to decrypt it and you pass the decryption key 
  * during this process in the future it will first check in the request if you made it as a person authorized to decrypt the filename in the first place
  * for now just assume yes it has been decided
6. now you have a file for unenc.myfile.md which sort of is weird since it should be just myfile.md right? Explanation below
  * well when it first gets created if we don't have sessions someone else can just query it at the moment it gets created before it gets encrypted which breaks this concept



## Quality standards

Readable code. Design for an interface not an implementation.

## Run the server

```zsh
node src/app/server.js -p 3500 0 1000
```

```zsh
curl http://localhost:3500/
```

Then we want to create a file, ideally with a unique value on whats past the hyphen.

> At this point we'll want to create a random ID. At this point it creates a file with extension `*.md.enc`. However, it does not yet do the encryption yet. 


```zsh
curl "http://localhost:3500/v1/create/bob-${RANDOM%899999+100000}" \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'defba315ababa315ababa315ababafed'
```


If the file starts as `myfile.md` the server will automatically save it as `myfile.md.enc`. So for now, the user must remember that they must 

```zsh
curl 'http://localhost:3500/v1/view/bob' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H "Content-Type: application/json" \
  -H 'Pragma: no-cache' \
  -d '{"jsonrpc":"2.0","method":"view","params":["name=draymond&password=deaba315ababa315adeaa315deabafed"],"id":26252}'
```



Then we want to protect Bob. Remember what that ID was. 
When you make this request, you'll need to pass that in the arguments

```zsh
curl 'http://localhost:3000/v0/protect/bob-321321' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'name=draymond&password=deaba315ababa315adeaa315deabafed'
```




### Task List

🔦 Next task. Send multiple arguments in a curl request

### Side Notes

```zsh
echo $((RANDOM%899999+100000))
``` 

Outputs a number such as `103879`. To put a command in a command, use either backticks or `$()`. 



From a web search

```bash
curl -d "param1=value1¶m2=value2" -X POST http://localhost:3000/data
```

## Run the server

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
curl 'http://localhost:3500/v0/lock/' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'filename=logins.csv&extension=csv' \
  -d 'password=12345678' -vvv
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
curl 'http://localhost:3500/v0/unlock/' \
  -X PUT \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'filename=logins&extension=csv' \
  -d 'password=12345678' -vvv
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

Starting state is that `/static/logins.csv.enc` is an encrypted file.
Our goal is to decrypt it. 

It has signature `app.put('/v0/unlock/:filename'`

```zsh
curl 'http://localhost:3000/v0/unlock/' \
  -X PUT \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'filename=logins&extension=csv' \
  -d 'password=defba315ababa315ababa315ababafed'
```


Then test it with

```zsh
curl 'http://localhost:3000/v0/view/' \
  -X PUT \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d '{"filename"="logins.csv"}' 
```



Comment is that password above may not be most up to date




Documentation tend to say 
`curl -X PUT -d arg=val -d arg2=val2 localhost:8080`




10. **Protect:** Writing a new file

`Status: This does not work yet`

```zsh
curl 'http://localhost:3500/v1/protect/' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'defba315ababa315ababa315ababafed' -vvv
```





10. **Unlock:** Decryption version of above **Experimental**

```zsh
curl 'http://localhost:3000/v1/unlock/myfilename' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'defba315ababa315ababa315ababafed'
```



10. **Create:** Upgraded version of create, make this and then it will encrypt which needs to have the enc dec key be sent as part of jsonrpc request **Experimental**

```zsh
curl 'http://localhost:3000/v1/create/bob-331331' \
  -X POST \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -d 'defba315ababa315ababa315ababafed'
```

> It may be wise to generate a random entry for key conflicts


12. **Experimental:** Viewing new file

```zsh
node test/readerstream.js '/d' init myetherfile.md 324234_266268
```

13. **Experimental:** Test writing with promise based pattern

```zsh
node test/writerstream.js '/d' init myetherfile.md 84935_484837
```


14. **Experimental:** When interacting from local to cloud server

```zsh
curl -X POST www.mmydomainname.com/v0/updates -L \
  -H 'Pragma: no-cache' 
```


# How to run this



```zsh
cd src
node aes.js encrypt file.txt 12345678
node aes.js decrypt file.txt.enc 12345678
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

----


```js
/**

dcStore will start as

inner file:  ./static/logins.csv.enc
arr1:  [ '', '/static/logins', 'csv', 'enc' ]
arrPop: [ '', '/static/logins', 'csv' ]
arrUnshift: [ 'unenc', '', '/static/logins', 'csv' ]
err in write stream:  [Error: ENOENT: no such file or directory, open 'unenc../static/logins.csv'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'unenc../static/logins.csv'
}

*/
```

