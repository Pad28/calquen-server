/**
 * Script para generar contraseñas hasheadas con bcrypt
 * Uso: node hash-password.js <contraseña>
 */

const bcrypt = require('bcrypt');

const password = process.argv[2] || 'password';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('❌ Error al generar hash:', err);
        process.exit(1);
    }

    console.log('\n✅ Hash generado exitosamente:\n');
    console.log('Contraseña:', password);
    console.log('Hash:', hash);
    console.log('\nPuedes usar este hash en tu base de datos.');
    console.log('\nEjemplo SQL:');
    console.log(`
UPDATE "user" 
SET password = '${hash}' 
WHERE email = 'tu@email.com';
    `);
});

