# Fitmeup App Backend

This is the backend of Fitmeup App of 3th edition of PEE Devhaton.

## 1. Description

Platform (social network like) for gyms, the idea is to have admins able to
register gyms with the address and other details, adquire certifications, etc.
Users will be able to signup in the registered gyms in the platform, associate
themselves with the gym they're working out in and their registration will be
validated for the gym as well. The users might publish opinions and feedback
about the gym they're attending to.

## Stack
<ul>
    <li style="display:flex;align-items:center;gap:15px;list-style:none;">
        <img width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
        <span>NodeJS</span>
    </li>
    <li style="display: flex;align-items:center;gap:15px;list-style:none;">
        <img width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
        <span>Express</span>
    </li>
    <li style="display:flex;align-items:center;gap:15px;list-style:none;">
        <img width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
        <span>MongoDB</span>
    </li>
    <li style="display:flex;align-items:center;gap:15px;list-style:none;">
        <img width="30" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
        <span>Docker and docker-compose</span>
    </li>
</ul>

## 2. Start the project
### 2.1 Environment file

<table>
    <thead>
        <tr>
            <th>Env name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>MONGO_USER</td>
            <td>Username to connect to database</td>
        </tr>
        <tr>
            <td>MONGO_PASS</td>
            <td>Password to connect to the database</td>
        </tr>
        <tr>
            <td>MONGO_URL</td>
            <td>Connection string to connect to database. It must follow this structure: mongodb://[MONGO_USER]:[MONGO_PASS]@[SERVER_NAME]:[DB_INCOMING_PORT], SERVER_NAME: localhost or docker-compose service name (in our case mongo)</td>
        </tr>
        <tr>
            <td>API_INCOMING_PORT</td>
            <td>This is the port that clients are going to send requests</td>
        </tr>
        <tr>
            <td>API_OUTCOMING_PORT</td>
            <td>This is the port that server is going to give responses</td>
        </tr>
        <tr>
            <td>API_DEBUG_INCOMING_PORT</td>
            <td>The same above but for debugging purposes inside docker contianer</td>
        </tr>
        <tr>
            <td>API_DEBUG_OUTCOMING_PORT</td>
            <td>The same above but for debugging purposes inside docker contianer</td>
        </tr>
        <tr>
            <td>DB_INCOMING_PORT</td>
            <td>This is the port that database service will listen for new requests</td>
        </tr>
        <tr>
            <td>DB_OUTCOMING_PORT</td>
            <td>This is the port that database service will respond the requests</td>
        </tr>
        <tr>
            <td>MONGO_MANAGER_INCOMING_PORT</td>
            <td>This is an extra service to manage database via interface, this value defines the port that this service is going to recieve the requests</td>
        </tr>
        <tr>
            <td>MONGO_MANAGER_OUTCOMING_PORT</td>
            <td>This is an extra service to manage database via interface, this value defines the port that this service is going to respond the requests</td>
        </tr>
        <tr>
            <td>TOKEN_SECRET</td>
            <td>This value is for signing access tokens, it must be an alphanumeric string, for example: CCjgVyPcY1N4FDlI9vPtXpz4234OOMBp5UNUyogciNJQjMIM26Td</td>
        </tr>
        <tr>
            <td>REFRESH_TOKEN_SECRET</td>
            <td>The same as TOKEN SECRET but for signing refresh tokens</td>
        </tr>
        <tr>
            <td>TOKEN_EXP_TIME</td>
            <td>This value indicates how long the access token is going to be valid. Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms"). </td>
        </tr>
        <tr>
            <td>REFRESH_TOKEN_EXP_TIME</td>
            <td>This value indicates how long the refresh token is going to be valid. Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").</td>
        </tr>
        <tr>
            <td>BCRYPT_SALT</td>
            <td>This value indicates number of rounds to generate the password, it must be a number.</td>
        </tr>
        <tr>
            <td>SUPERADMIN_EMAIL</td>
            <td>Email of super admin of the application</td>
        </tr>
        <tr>
            <td>SUPERADMIN_PASS</td>
            <td>Password of super admin of the application</td>
        </tr>
    </tbody>
</table>

### 2.2 Local

#### 2.2.1 Prerequisits

<ul style="list-style:none;">
    <li style="display:flex;align-items:center;gap:10px;">
        <span>NodeJS and NPM</span>
        <a href="https://nodejs.org/en/download/">
            <img src="./doc/img/download-icon.svg" alt="Download icon" width="20" heigth="20" />
        </a>
    </li>
    <li style="display:flex;align-items:center;gap:10px;">
        <span>MongoDB</span>
        <a href="https://www.mongodb.com/try/download/community">
            <img src="./doc/img/download-icon.svg" alt="Download icon" width="20" heigth="20" />
        </a>
    </li>
</ul>

We have to create an `.env` file in the project's root, then copy paste the
environment variables names and give a value.

```sh
echo "MONGO_USER=
MONGO_PASS=
MONGO_URL=
API_INCOMING_PORT=
TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
TOKEN_EXP_TIME=
REFRESH_TOKEN_EXP_TIME=
BCRYPT_SALT=
SUPERADMIN_EMAIL=
SUPERADMIN_PASS=" > <project path>/.env
```
#### 2.2.2 Start
1. Set up .env file
2. Install dependencies
```sh
npm install
```
3. Start API
```sh
npm run dev
```
### 2.3 Docker
#### 2.3.1 Prerequisits
<ul style="list-style:none;">
    <li style="display:flex;align-items:center;gap:10px;">
        <span>Docker Desktop</span>
        <a href="https://www.docker.com/products/docker-desktop/">
            <img src="./doc/img/download-icon.svg" alt="Download icon" width="20" heigth="20" />
        </a>
    </li>
</ul>

We have to create an `.env` file in the project's root, then copy paste the
environment variables names and give a value.

```sh
echo "MONGO_USER=
MONGO_PASS=
MONGO_URL=
API_INCOMING_PORT=
API_OUTCOMING_PORT=
API_DEBUG_INCOMING_PORT=
API_DEBUG_OUTCOMING_PORT=
DB_INCOMING_PORT=
DB_OUTCOMING_PORT=
MONGO_MANAGER_INCOMING_PORT=
MONGO_MANAGER_OUTCOMING_PORT=
TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
TOKEN_EXP_TIME=
REFRESH_TOKEN_EXP_TIME=
BCRYPT_SALT=
SUPERADMIN_EMAIL=
SUPERADMIN_PASS=" > <project path>/.env
```
#### 2.3.2 Start
1. Set up .env file
2. Build and run docker containers in detached mode
```sh
docker-compose -f docker-compose.dev.yml up -d
```
## 3. Postman
We have also a Postman collection to test the API with all endpoints configured and a DEV environment.
Please visit our Postman team workspace [fitmeuppee.postman.co](https://fitmeuppee.postman.co)
## 4. Debug with Docker
We have by default this project with this tool activated, here we have the following things involved:
1. VSCode `launch.json` file
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Docker: Attach to Node",
            "type": "node",
            "request": "attach",
            "port": 9229,
            "address": "localhost",
            "localRoot": "${workspaceFolder}/src",
            "remoteRoot": "/app/src",
            "protocol": "inspector",
            "skipFiles": [
                "${workspaceFolder}/node_modules/**/*.js",
                "<node_internals>/**/*.js"
            ]
        }
    ]
}
```
2. In `Dockerfile.dev` file we have already the option to start the API with debug mode
```yml
CMD ["npm", "run", "debug"]
```
* If you want to start the API without a debug mode just replace the above command to the following
```yml
CMD ["npm", "run", "dev"]
```
3. Go to VSCode debug tool and click on play, then put a breakpoint to any endpoint and make a request to this one.
## 5. Run suite tests
1. Local
```sh
npm run test
```
2. Docker
```sh
docker-compose -f docker-compose.dev.yml exec api npm run test
```
### Collaborators

- [Claudia Roxana Mendoza López](https://github.com/claudia17018)
- [Edgar Avila Argamonte](https://github.com/Edgar-Avila)
- [Marcelo](https://github.com/marcelowebdesigner)
- [Diego Octavio Saravia Mamani](https://github.com/diegosaraviamamani)
- [Josué](https://github.com/fjota)
- [Ivan Moll](https://github.com/imollm)

