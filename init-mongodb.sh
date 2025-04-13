#!/bin/bash

# Crear directorio para el archivo de clave si no existe
mkdir -p mongodb-config

# Generar archivo de clave si no existe
if [ ! -f mongodb-config/mongodb-keyfile ]; then
    echo "Generando archivo de clave..."
    openssl rand -base64 756 > mongodb-config/mongodb-keyfile
    sudo chmod 400 mongodb-config/mongodb-keyfile
    sudo chown 999:999 mongodb-config/mongodb-keyfile
fi

# Detener y limpiar contenedores existentes
echo "Deteniendo contenedores existentes..."
sudo docker compose down -v

# Iniciar MongoDB
echo "Iniciando MongoDB..."
sudo docker compose up -d

# Esperar a que MongoDB esté listo
echo "Esperando a que MongoDB esté listo..."
sleep 10

# Inicializar el conjunto de réplicas
echo "Inicializando conjunto de réplicas..."
sudo docker exec mongodb mongosh --username manueljerez --password HX7Yg5Dx5d2nBXvd --eval 'rs.initiate({_id: "rs0", members: [{_id: 0, host: "localhost:27017"}]})'

# Verificar estado del conjunto de réplicas
echo "Verificando estado del conjunto de réplicas..."
sudo docker exec mongodb mongosh --username manueljerez --password HX7Yg5Dx5d2nBXvd --eval 'rs.status()'

echo "¡Listo! MongoDB está configurado y listo para usar."
