/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `module` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."module" ADD COLUMN     "code" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "module_code_key" ON "public"."module"("code");

-- CreateIndex
CREATE INDEX "module_code_idx" ON "public"."module"("code");
