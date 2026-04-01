#!/bin/sh
set -e

# Inyecta la variable de entorno en el config.json antes de arrancar nginx
cat > /usr/share/nginx/html/assets/config.json <<EOF
{
    "domain": "${API_DOMAIN}",
    "port": ${API_PORT},
    "protocol": "${API_PROTOCOL}"
}
EOF

exec nginx -g "daemon off;"