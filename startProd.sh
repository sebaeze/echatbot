#!/bin/bash
git fetch
git pull
export AMBIENTE=produccion
npm run build
npm run buildAdmin
npm start