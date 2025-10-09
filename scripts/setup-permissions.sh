#!/bin/bash

echo "🚀 Configurando sistema de permisos..."

# 1. Generar migración de Prisma
echo "📝 Generando migración de Prisma..."
npx prisma migrate dev --name "setup-permissions-system"

# 2. Ejecutar seed de permisos
echo "🌱 Ejecutando seed de permisos..."
npx ts-node prisma/seed-permissions.ts

# 3. Generar cliente de Prisma
echo "🔧 Generando cliente de Prisma..."
npx prisma generate

echo "✅ Sistema de permisos configurado exitosamente!"
echo ""
echo "📋 Módulos creados:"
echo "  - USER_MANAGEMENT (Gestión de Usuarios)"
echo "  - CONFIGURATION (Configuración)"
echo "  - REPORTS (Reportes)"
echo "  - BILLING (Facturación)"
echo "  - COMPANY_MANAGEMENT (Gestión de Empresas)"
echo "  - EMPLOYEE_MANAGEMENT (Gestión de Empleados)"
echo "  - DOCUMENT_MANAGEMENT (Gestión de Documentos)"
echo ""
echo "🔑 Permisos creados:"
echo "  - READ (Leer)"
echo "  - CREATE (Crear)"
echo "  - UPDATE (Actualizar)"
echo "  - DELETE (Eliminar)"
echo "  - EXPORT (Exportar)"
echo "  - IMPORT (Importar)"
echo ""
echo "👥 Roles creados:"
echo "  - Administrador (todos los permisos)"
echo "  - Editor (READ, CREATE, UPDATE)"
echo "  - Visualizador (solo READ)"
echo ""
echo "🎯 Endpoints disponibles:"
echo "  GET    /user/:id/permissions           - Obtener permisos del usuario"
echo "  GET    /user/:id/permissions/summary   - Resumen de permisos"
echo "  PATCH  /user/:id/permissions           - Actualizar permisos"
echo "  GET    /user/:id/permissions/:module/:permission - Verificar permiso específico"
