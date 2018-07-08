# TODO (Task) API
## Requirement
- MySQL
- Node.js

## Install 
pull repository

```
git pull https://github.com/besthalo/todo.git
```

go to project Directory
```curl
cd ./{project_name}
```

install package , use npm or yarn 

```curl
npm install
```

start service

```curl
node server.js
```


test service:
[Health Check](http://localhost:3000/v1/healthcheck)



## Optional 
Install MySQL AND PHPMyAdmin  with docker
### Requirement
- docker

```curl
cd ./{project_name}
```

### Start Docker
In first time run this command. for create docker container and run container
```curl
docker-compose up -d
```
AND next time run this command
```curl
docker-compose start
```

### Stop Docker
```curl
docker-compose stop
```
