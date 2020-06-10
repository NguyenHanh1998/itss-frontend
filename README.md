# 自然の友 Frontend

## First install

### Require:
 - Nodejs: v10.17.0 (Latest LTS: Dubnium)
 - NPM or yarn
 - PM2
### Init
Install node module

    cd frontend/ && yarn install 

### Config env
Clone `.env.example` to `.env` file and fill with your configuration

### Build
To build, run script, build folder is in `dist`

  cd frontend/ && yarn run build

If meet error with environment, export your config and run with script

  cd frontend
  export REACT_APP_API_URL=http://localhost:8000 && yarn run build_no


## Distribute your build to server

## Run on local

  Go to frontend and start process by

    cd frontend
    yarn start