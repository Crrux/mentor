#!/bin/bash

npm run build

npm run typeorm -- -d dist/ormconfig.js migration:run