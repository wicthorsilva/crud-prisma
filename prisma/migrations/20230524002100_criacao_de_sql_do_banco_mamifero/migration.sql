-- CreateTable
CREATE TABLE "Lobo" (
    "id" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "caracteristicas" TEXT NOT NULL,
    "pesoMedio" INTEGER NOT NULL,
    "carnivoro" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lobo_pkey" PRIMARY KEY ("id")
);
