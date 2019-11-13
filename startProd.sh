#!/bin/bash
export AMBIENTE=produccion
npm run build
npm run buildAdmin
npm start