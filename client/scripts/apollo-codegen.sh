#!/bin/bash
cd src/graphql
apollo-codegen introspect-schema schema.graphql --output schema.json
apollo-codegen generate **/*.graphql --schema schema.json --target flow --output schema.flow.js
rm schema.json
