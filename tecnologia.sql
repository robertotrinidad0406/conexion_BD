/* 
"Vendemos diferentes equipos tecnológicos como computadoras, celulares y accesorios. 
Necesitamos organizar la información de nuestros productos. Cada producto pertenece a una 
categoría y tiene información como nombre, descripción, precio y cantidad disponible.
Trabajamos con diferentes proveedores que nos entregan productos periódicamente. 
Necesitamos registrar las compras realizadas a nuestros proveedores para conocer qué 
productos ingresaron al almacén.
Nuestros clientes realizan compras y cada venta puede incluir varios productos.
También contamos con empleados encargados de atender las ventas y necesitamos 
identificar quién realizó cada operación.
*/
-- equipos tecnológicos como computadoras, celulares y accesorios. 
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);
-- Cada producto pertenece a una categoría
CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    stock_actual INT NOT NULL DEFAULT 0 CHECK (stock_actual >= 0),
    id_categoria INT NOT NULL,
    CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) 
        REFERENCES categoria(id) ON DELETE CASCADE
);

CREATE TABLE proveedor (
    id SERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(100) NOT NULL,
    contacto_nombre VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    direccion VARCHAR(100)
);

CREATE TABLE compra (
    id SERIAL PRIMARY KEY,
    id_proveedor INT NOT NULL,
    fecha_compra DATE,
    total_compra NUMERIC(10, 2) NOT NULL CHECK (total_compra >= 0),
    CONSTRAINT fk_compra_proveedor FOREIGN KEY (id_proveedor) 
        REFERENCES proveedor(id) ON DELETE CASCADE
);

CREATE TABLE detalle_compra (
    id SERIAL PRIMARY KEY,
    id_compra INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10, 2) NOT NULL CHECK (precio_unitario >= 0),
    CONSTRAINT fk_detcompra_compra FOREIGN KEY (id_compra) 
        REFERENCES compra(id)  ON DELETE CASCADE,
    CONSTRAINT fk_detcompra_producto FOREIGN KEY (id_producto) 
        REFERENCES producto(id) ON DELETE CASCADE
);

CREATE TABLE empleado (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
	telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    documento VARCHAR(20) UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE venta (
    id SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_empleado INT NOT NULL,
    fecha_venta DATE,
    total_venta NUMERIC(10, 2) NOT NULL CHECK (total_venta >= 0),
    CONSTRAINT fk_venta_cliente FOREIGN KEY (id_cliente) 
        REFERENCES cliente(id) ON DELETE CASCADE,
    CONSTRAINT fk_venta_empleado FOREIGN KEY (id_empleado) 
        REFERENCES empleado(id) ON DELETE CASCADE
);

CREATE TABLE detalle_venta (
    id SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10, 2) NOT NULL CHECK (precio_unitario >= 0),
    CONSTRAINT fk_detventa_venta FOREIGN KEY (id_venta) 
        REFERENCES venta(id) ON DELETE CASCADE,
    CONSTRAINT fk_detventa_producto FOREIGN KEY (id_producto) 
        REFERENCES producto(id) ON DELETE CASCADE
);