-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "photos" TEXT[],
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Offer_licensePlate_key" ON "Offer"("licensePlate");
