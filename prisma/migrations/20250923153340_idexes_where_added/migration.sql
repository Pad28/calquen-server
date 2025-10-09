/*
  Warnings:

  - You are about to drop the column `response_status` on the `client_request` table. All the data in the column will be lost.
  - The `status` column on the `client_request` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[company_id,employee_id]` on the table `company_employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[module_id,permission_id]` on the table `module_permission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."client_request" DROP COLUMN "response_status",
DROP COLUMN "status",
ADD COLUMN     "status" "public"."CLIENT_REQUEST_STATUS" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "bank_is_active_idx" ON "public"."bank"("is_active");

-- CreateIndex
CREATE INDEX "client_request_company_id_idx" ON "public"."client_request"("company_id");

-- CreateIndex
CREATE INDEX "client_request_user_id_idx" ON "public"."client_request"("user_id");

-- CreateIndex
CREATE INDEX "client_request_request_type_id_idx" ON "public"."client_request"("request_type_id");

-- CreateIndex
CREATE INDEX "client_request_status_idx" ON "public"."client_request"("status");

-- CreateIndex
CREATE INDEX "client_request_created_at_idx" ON "public"."client_request"("created_at");

-- CreateIndex
CREATE INDEX "client_request_company_id_status_idx" ON "public"."client_request"("company_id", "status");

-- CreateIndex
CREATE INDEX "client_request_user_id_status_idx" ON "public"."client_request"("user_id", "status");

-- CreateIndex
CREATE INDEX "company_business_sector_idx" ON "public"."company"("business_sector");

-- CreateIndex
CREATE INDEX "company_is_active_idx" ON "public"."company"("is_active");

-- CreateIndex
CREATE INDEX "company_created_at_idx" ON "public"."company"("created_at");

-- CreateIndex
CREATE INDEX "company_business_sector_is_active_idx" ON "public"."company"("business_sector", "is_active");

-- CreateIndex
CREATE INDEX "company_employee_company_id_idx" ON "public"."company_employee"("company_id");

-- CreateIndex
CREATE INDEX "company_employee_employee_id_idx" ON "public"."company_employee"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_employee_company_id_employee_id_key" ON "public"."company_employee"("company_id", "employee_id");

-- CreateIndex
CREATE INDEX "document_category_is_active_idx" ON "public"."document_category"("is_active");

-- CreateIndex
CREATE INDEX "document_category_name_idx" ON "public"."document_category"("name");

-- CreateIndex
CREATE INDEX "document_category_created_at_idx" ON "public"."document_category"("created_at");

-- CreateIndex
CREATE INDEX "employee_company_id_idx" ON "public"."employee"("company_id");

-- CreateIndex
CREATE INDEX "employee_user_id_idx" ON "public"."employee"("user_id");

-- CreateIndex
CREATE INDEX "employee_bank_id_idx" ON "public"."employee"("bank_id");

-- CreateIndex
CREATE INDEX "employee_type_of_contract_idx" ON "public"."employee"("type_of_contract");

-- CreateIndex
CREATE INDEX "employee_afp_idx" ON "public"."employee"("afp");

-- CreateIndex
CREATE INDEX "employee_sistema_salud_idx" ON "public"."employee"("sistema_salud");

-- CreateIndex
CREATE INDEX "employee_created_at_idx" ON "public"."employee"("created_at");

-- CreateIndex
CREATE INDEX "employee_company_id_type_of_contract_idx" ON "public"."employee"("company_id", "type_of_contract");

-- CreateIndex
CREATE INDEX "employee_afp_sistema_salud_idx" ON "public"."employee"("afp", "sistema_salud");

-- CreateIndex
CREATE INDEX "employee_requests_company_id_idx" ON "public"."employee_requests"("company_id");

-- CreateIndex
CREATE INDEX "employee_requests_employee_id_idx" ON "public"."employee_requests"("employee_id");

-- CreateIndex
CREATE INDEX "employee_requests_status_idx" ON "public"."employee_requests"("status");

-- CreateIndex
CREATE INDEX "employee_requests_company_id_status_idx" ON "public"."employee_requests"("company_id", "status");

-- CreateIndex
CREATE INDEX "employee_requests_employee_id_status_idx" ON "public"."employee_requests"("employee_id", "status");

-- CreateIndex
CREATE INDEX "module_name_idx" ON "public"."module"("name");

-- CreateIndex
CREATE INDEX "module_permission_module_id_idx" ON "public"."module_permission"("module_id");

-- CreateIndex
CREATE INDEX "module_permission_permission_id_idx" ON "public"."module_permission"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "module_permission_module_id_permission_id_key" ON "public"."module_permission"("module_id", "permission_id");

-- CreateIndex
CREATE INDEX "permission_code_idx" ON "public"."permission"("code");

-- CreateIndex
CREATE INDEX "permission_name_idx" ON "public"."permission"("name");

-- CreateIndex
CREATE INDEX "request_type_name_idx" ON "public"."request_type"("name");

-- CreateIndex
CREATE INDEX "request_type_is_active_idx" ON "public"."request_type"("is_active");

-- CreateIndex
CREATE INDEX "request_type_is_active_name_idx" ON "public"."request_type"("is_active", "name");

-- CreateIndex
CREATE INDEX "rh_document_company_id_idx" ON "public"."rh_document"("company_id");

-- CreateIndex
CREATE INDEX "rh_document_category_id_idx" ON "public"."rh_document"("category_id");

-- CreateIndex
CREATE INDEX "rh_document_user_id_idx" ON "public"."rh_document"("user_id");

-- CreateIndex
CREATE INDEX "rh_document_type_idx" ON "public"."rh_document"("type");

-- CreateIndex
CREATE INDEX "rh_document_name_idx" ON "public"."rh_document"("name");

-- CreateIndex
CREATE INDEX "rh_document_company_id_category_id_idx" ON "public"."rh_document"("company_id", "category_id");

-- CreateIndex
CREATE INDEX "rh_document_user_id_type_idx" ON "public"."rh_document"("user_id", "type");

-- CreateIndex
CREATE INDEX "role_name_idx" ON "public"."role"("name");

-- CreateIndex
CREATE INDEX "role_created_at_idx" ON "public"."role"("created_at");

-- CreateIndex
CREATE INDEX "role_module_permission_role_id_idx" ON "public"."role_module_permission"("role_id");

-- CreateIndex
CREATE INDEX "role_module_permission_module_id_idx" ON "public"."role_module_permission"("module_id");

-- CreateIndex
CREATE INDEX "role_module_permission_permission_id_idx" ON "public"."role_module_permission"("permission_id");

-- CreateIndex
CREATE INDEX "role_module_permission_is_active_idx" ON "public"."role_module_permission"("is_active");

-- CreateIndex
CREATE INDEX "role_module_permission_created_at_idx" ON "public"."role_module_permission"("created_at");

-- CreateIndex
CREATE INDEX "role_module_permission_role_id_module_id_permission_id_idx" ON "public"."role_module_permission"("role_id", "module_id", "permission_id");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "public"."user"("email");

-- CreateIndex
CREATE INDEX "user_rut_idx" ON "public"."user"("rut");

-- CreateIndex
CREATE INDEX "user_is_active_idx" ON "public"."user"("is_active");

-- CreateIndex
CREATE INDEX "user_role_id_idx" ON "public"."user"("role_id");

-- CreateIndex
CREATE INDEX "user_last_conection_idx" ON "public"."user"("last_conection");

-- CreateIndex
CREATE INDEX "user_created_at_idx" ON "public"."user"("created_at");

-- CreateIndex
CREATE INDEX "user_is_active_role_id_idx" ON "public"."user"("is_active", "role_id");
