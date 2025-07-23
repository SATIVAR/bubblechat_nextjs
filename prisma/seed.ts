
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file");
    process.exit(1);
  }

  // Não usamos hash para a senha do admin, mas o campo precisa existir
  // A lógica de autorização vai comparar a senha em texto plano.
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Super Admin',
      // No schema.prisma, o campo password é opcional (String?), então não precisamos fornecê-lo aqui
      // se a lógica de autorização vai pular a verificação de hash para o admin.
      // Se o campo for obrigatório, podemos colocar um placeholder.
      password: "admin_placeholder_not_used"
    },
  });

  console.log(`Admin user ${adminEmail} created or already exists.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
