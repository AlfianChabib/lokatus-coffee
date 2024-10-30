import { PrismaClient } from "@prisma/client";
import quotes from "./quotes.json";

const prisma = new PrismaClient();

async function main() {
  const quote = quotes.map(async (quote) => {
    return await prisma.quote.createMany({
      data: {
        content: quote.content,
        author: quote.author,
        mood: quote.mood === "happy" ? "HAPPY" : "SAD",
        isActive: true,
        canShow: true,
      },
    });
  });

  Promise.all(quote);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
