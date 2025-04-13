@echo off
setlocal enabledelayedexpansion

REM Crear directorio para el archivo de clave si no existe
if not exist mongodb-config mkdir mongodb-config

REM Generar archivo de clave si no existe
if not exist mongodb-config\mongodb-keyfile (
    echo Generando archivo de clave...
    REM En Windows necesitamos usar PowerShell para generar el archivo de clave
    powershell -Command "$bytes = New-Object byte[] 756; $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::Create(); $rng.GetBytes($bytes); [Convert]::ToBase64String($bytes) | Out-File -FilePath mongodb-config\mongodb-keyfile -Encoding ASCII"
    
    REM Establecer permisos (esto puede variar según la versión de Windows)
    icacls mongodb-config\mongodb-keyfile /inheritance:r
    icacls mongodb-config\mongodb-keyfile /grant:r "Administrators:(R)"
)

REM Detener y limpiar contenedores existentes
echo Deteniendo contenedores existentes...
docker compose down -v

REM Iniciar MongoDB
echo Iniciando MongoDB...
docker compose up -d

REM Esperar a que MongoDB esté listo
echo Esperando a que MongoDB esté listo...
timeout /t 5 /nobreak

REM Inicializar el conjunto de réplicas
echo Inicializando conjunto de réplicas...
docker exec mongodb mongosh --username manueljerez --password HX7Yg5Dx5d2nBXvd --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})"

REM Verificar estado del conjunto de réplicas
echo Verificando estado del conjunto de réplicas...
docker exec mongodb mongosh --username manueljerez --password HX7Yg5Dx5d2nBXvd --eval "rs.status()"

echo ¡Listo! MongoDB está configurado y listo para usar.
pause 