// Acceder a la base de datos
db = db.getSiblingDB('proyecto-webmovil');

// Crear colección 'usuarios' y agregar datos de ejemplo
db.createCollection('usuarios');
db.usuarios.insertMany([
  {
    nombre: "Juan Pérez",
    correo: "juan@example.com",
    contraseña: "hash_del_password_juan",
    rol: "locatario",
    datosContacto: {
      telefono: "123456789",
      direccion: "Calle Falsa 123"
    },
    puntaje: 75
  },
  {
    nombre: "María López",
    correo: "maria@example.com",
    contraseña: "hash_del_password_maria",
    rol: "comprador",
    datosContacto: {
      telefono: "987654321",
      direccion: "Avenida Siempre Viva 742"
    }
  },
  {
    nombre: "Admin Sistema",
    correo: "admin@example.com",
    contraseña: "hash_del_password_admin",
    rol: "admin",
    datosContacto: {
      telefono: "555123456",
      direccion: "Oficina Central 100"
    }
  },
  {
    nombre: "Carlos Rodríguez",
    correo: "carlos@example.com",
    contraseña: "hash_del_password_carlos",
    rol: "repartidor",
    datosContacto: {
      telefono: "555987654",
      direccion: "Calle Delivery 200"
    },
    puntaje: 90
  }
]);

// Crear colección 'productos' y agregar datos de ejemplo
// Primero guardamos el ID del usuario locatario para referenciarlo
const locatarioId = db.usuarios.findOne({rol: "locatario"})._id;

db.createCollection('productos');
db.productos.insertMany([
  {
    locatario_id: locatarioId,
    nombre: "Empanadas de carne",
    descripcion: "Deliciosas empanadas caseras",
    precio: 150.0,
    propiedades: {
      vegetariano: false,
      vegano: false,
      sinGluten: true,
      calorias: 250
    },
    categoria: "Alimentos",
    imagenes: [
      "http://ejemplo.com/empanada1.jpg",
      "http://ejemplo.com/empanada2.jpg"
    ],
    inventario: 30
  },
  {
    locatario_id: locatarioId,
    nombre: "Pizza vegana",
    descripcion: "Pizza con queso vegano y vegetales frescos",
    precio: 280.0,
    propiedades: {
      vegetariano: true,
      vegano: true,
      sinGluten: false,
      calorias: 320
    },
    categoria: "Alimentos",
    imagenes: [
      "http://ejemplo.com/pizza1.jpg",
      "http://ejemplo.com/pizza2.jpg"
    ],
    inventario: 15
  }
]);

// Crear colección 'proveedores' y agregar datos de ejemplo
db.createCollection('proveedores');
db.proveedores.insertMany([
  {
    nombre: "Proveedor Alimenticio S.A.",
    datosContacto: {
      telefono: "987654321",
      correo: "contacto@proveedor.com",
      direccion: "Av. Siempre Viva 742"
    },
    categorias: ["Alimentos", "Bebidas"],
    locatario_ids: [locatarioId]
  },
  {
    nombre: "Distribuidora Orgánica",
    datosContacto: {
      telefono: "555444333",
      correo: "ventas@organica.com",
      direccion: "Calle Ecológica 456"
    },
    categorias: ["Alimentos Orgánicos", "Productos Naturales"],
    locatario_ids: [locatarioId]
  }
]);

// Crear colección 'ordenes' y agregar datos de ejemplo
// Obtenemos IDs necesarios
const compradorId = db.usuarios.findOne({rol: "comprador"})._id;
const productoId = db.productos.findOne({nombre: "Empanadas de carne"})._id;

db.createCollection('ordenes');
db.ordenes.insertMany([
  {
    comprador_id: compradorId,
    locatario_id: locatarioId,
    items: [
      {
        producto_id: productoId,
        nombre: "Empanadas de carne",
        cantidad: 3,
        precioUnitario: 150.0,
        subtotal: 450.0
      }
    ],
    metodoEntrega: "delivery",
    estado: "en preparación",
    fechaCreacion: new Date("2025-04-09T10:00:00Z"),
    fechaActualizacion: new Date("2025-04-09T10:30:00Z"),
    detallesPago: {
      montoTotal: 450.0,
      estadoPago: "completado"
    },
    estadoLogs: [
      { estado: "pendiente", timestamp: new Date("2025-04-09T10:00:00Z") },
      { estado: "en preparación", timestamp: new Date("2025-04-09T10:20:00Z") }
    ]
  },
  {
    comprador_id: compradorId,
    locatario_id: locatarioId,
    items: [
      {
        producto_id: productoId,
        nombre: "Empanadas de carne",
        cantidad: 2,
        precioUnitario: 150.0,
        subtotal: 300.0
      }
    ],
    metodoEntrega: "retiro en tienda",
    estado: "entregado",
    fechaCreacion: new Date("2025-04-08T15:30:00Z"),
    fechaActualizacion: new Date("2025-04-08T16:45:00Z"),
    detallesPago: {
      montoTotal: 300.0,
      estadoPago: "completado"
    },
    estadoLogs: [
      { estado: "pendiente", timestamp: new Date("2025-04-08T15:30:00Z") },
      { estado: "en preparación", timestamp: new Date("2025-04-08T15:50:00Z") },
      { estado: "listo para retirar", timestamp: new Date("2025-04-08T16:30:00Z") },
      { estado: "entregado", timestamp: new Date("2025-04-08T16:45:00Z") }
    ]
  }
]);

// Crear colección 'calificaciones' y agregar datos de ejemplo
const ordenId = db.ordenes.findOne()._id;

db.createCollection('calificaciones');
db.calificaciones.insertMany([
  {
    orden_id: ordenId,
    locatario_id: locatarioId,
    comprador_id: compradorId,
    puntuacion: 4,
    comentario: "Buen servicio y calidad en los productos.",
    fechaCalificacion: new Date("2025-04-09T11:00:00Z")
  },
  {
    orden_id: ordenId,
    locatario_id: locatarioId,
    comprador_id: compradorId,
    puntuacion: 5,
    comentario: "Excelente atención y rapidez en la entrega.",
    fechaCalificacion: new Date("2025-04-08T17:30:00Z")
  }
]);

// Crear índices para mejorar las búsquedas
db.usuarios.createIndex({ correo: 1 }, { unique: true });
db.usuarios.createIndex({ rol: 1 });
db.productos.createIndex({ locatario_id: 1 });
db.productos.createIndex({ categoria: 1 });
db.ordenes.createIndex({ comprador_id: 1 });
db.ordenes.createIndex({ locatario_id: 1 });
db.calificaciones.createIndex({ locatario_id: 1 });