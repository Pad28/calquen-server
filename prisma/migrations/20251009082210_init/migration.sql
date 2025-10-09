/*
  Warnings:

  - You are about to alter the column `name` on the `module` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to drop the column `last_conection` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(10)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `rut` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(15)`.
  - You are about to alter the column `first_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `last_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(10)`.
  - You are about to drop the `module_permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_module_permission` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `module` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."module_permission" DROP CONSTRAINT "module_permission_module_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."module_permission" DROP CONSTRAINT "module_permission_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_module_permission" DROP CONSTRAINT "role_module_permission_id_fkey";

-- DropIndex
DROP INDEX "public"."user_last_conection_idx";

-- AlterTable
ALTER TABLE "public"."module" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "public"."role" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "last_conection",
ADD COLUMN     "last_connection" TIMESTAMP(6),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "rut" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(10);

-- DropTable
DROP TABLE "public"."module_permission";

-- DropTable
DROP TABLE "public"."permission";

-- DropTable
DROP TABLE "public"."role_module_permission";

-- CreateTable
CREATE TABLE "public"."user_module_permission" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "user_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "can_create" BOOLEAN NOT NULL DEFAULT true,
    "can_read" BOOLEAN NOT NULL DEFAULT true,
    "can_update" BOOLEAN NOT NULL DEFAULT true,
    "can_delete" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_module_permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_module_permission_user_id_idx" ON "public"."user_module_permission"("user_id");

-- CreateIndex
CREATE INDEX "user_module_permission_module_id_idx" ON "public"."user_module_permission"("module_id");

-- CreateIndex
CREATE INDEX "user_module_permission_user_id_module_id_idx" ON "public"."user_module_permission"("user_id", "module_id");

-- CreateIndex
CREATE UNIQUE INDEX "module_name_key" ON "public"."module"("name");

-- CreateIndex
CREATE INDEX "module_is_active_idx" ON "public"."module"("is_active");

-- CreateIndex
CREATE INDEX "module_created_at_idx" ON "public"."module"("created_at");

-- CreateIndex
CREATE INDEX "user_last_connection_idx" ON "public"."user"("last_connection");

-- AddForeignKey
ALTER TABLE "public"."user_module_permission" ADD CONSTRAINT "user_module_permission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_module_permission" ADD CONSTRAINT "user_module_permission_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
