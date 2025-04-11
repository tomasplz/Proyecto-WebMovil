# Proyecto-WebMovil

paso 1 (cuando se habre por primera vez): docker-compose up -d

ver si el docker esta corriendo: docker ps

# Configuración de MongoDB

La URL de conexión para MongoDB es:
```
mongodb://manueljerez:HX7Yg5Dx5d2nBXvd@localhost:27017
```

Se recomienda colocar esta URL en un archivo `.env` en el backend para mantenerla segura. Ejemplo:
```
MONGO_URI=mongodb://manueljerez:HX7Yg5Dx5d2nBXvd@localhost:27017
```

Luego, cargar esta variable en tu aplicación para configurar la conexión a MongoDB.
