/*
  Warnings:

  - A unique constraint covering the columns `[user_id,module_id]` on the table `user_module_permission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."user_module_permission_user_id_module_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "user_module_permission_user_id_module_id_key" ON "public"."user_module_permission"("user_id", "module_id");
