#!/bin/bash
hint="${GITHUB_REPOSITORY#*/}"
hint=$(echo "$hint" | sed -E 's/[^[:alnum:]]+/_/g' | tr '[:lower:]' '[:upper:]')
hint="SETTINGS__${hint}"
settings="${!hint}"

cat > .devcontainer/.env <<EOF
$settings
FRONTEND_URL=https://$CODESPACE_NAME-8080.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
EOF
