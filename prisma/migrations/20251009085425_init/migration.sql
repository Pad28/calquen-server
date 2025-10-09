/*
  Warnings:

  - Added the required column `role_name` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ROLE_NAME" AS ENUM ('ADMIN', 'CLIENT', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "public"."role" ADD COLUMN     "role_name" "public"."ROLE_NAME" NOT NULL;
