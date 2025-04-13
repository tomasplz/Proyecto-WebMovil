# Proyecto Web Móvil - Microservicio de Registro

Este proyecto implementa un microservicio de registro de usuarios utilizando NestJS, Prisma y MongoDB.

## Requisitos Previos

### Para Linux/macOS:
- Node.js (v16 o superior)
- Docker y Docker Compose
- MongoDB (se ejecuta en Docker)
- OpenSSL (para generar el archivo de clave)

### Para Windows:
- Node.js (v16 o superior)
- Docker Desktop para Windows
- PowerShell 5.1 o superior
- Docker Compose (incluido en Docker Desktop)

## Configuración del Entorno

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_REPOSITORIO]
```

2. Copiar el archivo de variables de entorno de ejemplo:
```bash
# Linux/macOS
cp .env.example .env

# Windows
copy .env.example .env
```

3. Configurar las variables de entorno en `.env`:
```
MONGO_INITDB_ROOT_USERNAME=tu_usuario
MONGO_INITDB_ROOT_PASSWORD=tu_contraseña
```

## Inicialización de MongoDB

### Linux/macOS:
1. Dar permisos de ejecución al script:
```bash
chmod +x init-mongodb.sh
```

2. Ejecutar el script:
```bash
./init-mongodb.sh
```

### Windows:
1. Ejecutar el script:
```cmd
init-mongodb.bat
```

El script:
- Crea el archivo de clave necesario
- Inicia el contenedor de MongoDB
- Configura el conjunto de réplicas
- Verifica el estado de la configuración

## Estructura del Proyecto

```
.
├── microservices/
│   └── registration-microservice/
│       ├── src/
│       │   ├── register/
│       │   │   ├── register.controller.ts
│       │   │   ├── register.service.ts
│       │   │   └── register.dto.ts
│       │   └── app.module.ts
│       ├── prisma/
│       │   └── schema.prisma
│       └── .env
├── docker-compose.yml
├── init-mongodb.sh
└── README.md
```

## Uso del Microservicio

### Registro de Usuarios

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123",
    "name": "Nombre Usuario"
  }'
```

### Listar Usuarios

```bash
curl -X GET http://localhost:3000/register
```

## Desarrollo

1. Instalar dependencias:
```bash
cd microservices/registration-microservice
npm install
```

2. Iniciar el servidor en modo desarrollo:
```bash
npm run start:dev
```

## Seguridad

- El archivo de clave de MongoDB (`mongodb-keyfile`) está excluido del control de versiones
- Las variables de entorno sensibles están en `.env` y no se suben al repositorio
- Se utiliza autenticación SCRAM-SHA-1 para MongoDB

## Solución de Problemas

Si encuentras problemas con el conjunto de réplicas:

1. Verificar que MongoDB está corriendo:
```bash
sudo docker ps | grep mongodb
```

2. Verificar el estado del conjunto de réplicas:
```bash
sudo docker exec mongodb mongosh --username [USUARIO] --password [CONTRASEÑA] --eval 'rs.status()'
```

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

[ESPECIFICAR LICENCIA]
