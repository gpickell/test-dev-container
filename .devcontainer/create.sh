#!/bin/sh
cat > ~/.INFO.md <<EOF
# Welcome to VertiGIS Studio for Codespaces
You can see all your favorite tools [here](https://${CODESPACE_NAME}-8080.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN})
EOF

node .devcontainer/register-app.mjs
