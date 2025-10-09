-- Script SQL para crear usuarios de prueba
-- Ejecutar en PostgreSQL
-- 1. Crear roles si no existen
-- Rol Admin
INSERT INTO role (
        id,
        name,
        description,
        role_name,
        created_at,
        updated_at
    )
VALUES (
        'a0000000-0000-0000-0000-000000000001'::uuid,
        'Administrador',
        'Usuario administrador del sistema',
        'ADMIN',
        NOW(),
        NOW()
    ) ON CONFLICT (role_name) DO NOTHING;
-- Rol Client
INSERT INTO role (
        id,
        name,
        description,
        role_name,
        created_at,
        updated_at
    )
VALUES (
        'c0000000-0000-0000-0000-000000000002'::uuid,
        'Cliente',
        'Usuario cliente del sistema',
        'CLIENT',
        NOW(),
        NOW()
    ) ON CONFLICT (role_name) DO NOTHING;
-- 2. Crear usuarios de prueba
-- Contraseña para ambos: "password"
-- Hash bcrypt: $2b$10$YourActualHashHere (debes reemplazar con un hash real)
-- Usuario Admin
INSERT INTO "user" (
        id,
        email,
        password,
        first_name,
        last_name,
        rut,
        phone,
        is_active,
        role_id,
        created_at,
        updated_at
    )
VALUES (
        'u0000000-0000-0000-0000-000000000001'::uuid,
        'admin@calquen.cl',
        '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36h.XWFZwVJcN3WK/gJK8yG',
        -- password: "password"
        'Admin',
        'Sistema',
        '11111111-1',
        '+56912345678',
        true,
        'a0000000-0000-0000-0000-000000000001'::uuid,
        NOW(),
        NOW()
    ) ON CONFLICT (email) DO
UPDATE
SET password = EXCLUDED.password;
-- Usuario Cliente
INSERT INTO "user" (
        id,
        email,
        password,
        first_name,
        last_name,
        rut,
        phone,
        is_active,
        role_id,
        created_at,
        updated_at
    )
VALUES (
        'u0000000-0000-0000-0000-000000000002'::uuid,
        'cliente@empresa.cl',
        '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36h.XWFZwVJcN3WK/gJK8yG',
        -- password: "password"
        'Cliente',
        'Demo',
        '22222222-2',
        '+56987654321',
        true,
        'c0000000-0000-0000-0000-000000000002'::uuid,
        NOW(),
        NOW()
    ) ON CONFLICT (email) DO
UPDATE
SET password = EXCLUDED.password;
-- 3. Verificar usuarios creados
SELECT u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.is_active,
    r.name as role_name,
    r.role_name
FROM "user" u
    JOIN role r ON u.role_id = r.id
WHERE u.email IN ('admin@calquen.cl', 'cliente@empresa.cl');