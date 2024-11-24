-- CreateTable
CREATE TABLE "quote_requests" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'REQUESTED',

    CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quote_requests_id_key" ON "quote_requests"("id");
