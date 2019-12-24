# Waiboc website / frontend

## Git clone
## npm install

## Dev test
npm start
run start:react
run start:admin

## APIs


## Deploy Donweb
- pm2 delete waiboc-website
- cd /git/echatbot
- git pull
- npm install
- npm update echatbot-mongodb
- export AMBIENTE=produccion
- npm run build
- npm run buildAdmin
- pm2 start npm --no-automation  --name waiboc-website -- run startProd
- pm2 save