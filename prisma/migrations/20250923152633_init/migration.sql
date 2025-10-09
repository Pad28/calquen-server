-- CreateEnum
CREATE TYPE "public"."CLIENT_REQUEST_STATUS" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."EMPLOYE_REQUEST_STATUS" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."CONTRACT_TYPE" AS ENUM ('INDEFINIDO', 'PLAZO_FIJO', 'POR_OBRA', 'HONORARIOS', 'PRACTICA');

-- CreateEnum
CREATE TYPE "public"."AFP_TYPE" AS ENUM ('AFP_CAPITAL', 'AFP_CUPRUM', 'AFP_HABITAT', 'AFP_PLANVITAL', 'AFP_PROVIDA', 'AFP_MODELO', 'AFP_UNO');

-- CreateEnum
CREATE TYPE "public"."HEALTHCARE_SYSTEM" AS ENUM ('FONASA', 'ISAPRE');

-- CreateTable
CREATE TABLE "public"."bank" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code " VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."client_request" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "request_type_id" UUID NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "response_status" "public"."CLIENT_REQUEST_STATUS" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "client_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."company" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "business_sector" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "billing_frequency" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."company_employee" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "company_employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."document_category" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "document_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."employee" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "type_of_contract" "public"."CONTRACT_TYPE" NOT NULL DEFAULT 'INDEFINIDO',
    "assignments" VARCHAR(255) NOT NULL,
    "net_salary" MONEY NOT NULL,
    "afp" "public"."AFP_TYPE" NOT NULL DEFAULT 'AFP_CAPITAL',
    "family_burdens" INTEGER NOT NULL,
    "sistema_salud" "public"."HEALTHCARE_SYSTEM" NOT NULL DEFAULT 'FONASA',
    "bank_id" UUID NOT NULL,
    "account_type" VARCHAR(255) NOT NULL,
    "account_number" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."employee_requests" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,
    "status" "public"."EMPLOYE_REQUEST_STATUS" NOT NULL DEFAULT 'PENDING',
    "created_at" VARCHAR(255) NOT NULL,
    "updatet_at" VARCHAR(255) NOT NULL,

    CONSTRAINT "employee_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."module" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."module_permission" (
    "id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "public"."permission" (
    "id" UUID NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."request_type" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "request_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rh_document" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "company_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "size" DECIMAL NOT NULL,

    CONSTRAINT "rh_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_module_permission" (
    "id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "role_module_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "rut" VARCHAR(255) NOT NULL,
    "last_conection" TIMESTAMP(6) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "role_id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bank_name_key" ON "public"."bank"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bank_code _key" ON "public"."bank"("code ");

-- CreateIndex
CREATE UNIQUE INDEX "module_permission_id_key" ON "public"."module_permission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_code_key" ON "public"."permission"("code");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "public"."role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_rut_key" ON "public"."user"("rut");

-- AddForeignKey
ALTER TABLE "public"."client_request" ADD CONSTRAINT "client_request_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."client_request" ADD CONSTRAINT "client_request_request_type_id_fkey" FOREIGN KEY ("request_type_id") REFERENCES "public"."request_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."client_request" ADD CONSTRAINT "client_request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."company_employee" ADD CONSTRAINT "company_employee_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."company_employee" ADD CONSTRAINT "company_employee_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee" ADD CONSTRAINT "employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee_requests" ADD CONSTRAINT "employee_requests_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employee_requests" ADD CONSTRAINT "employee_requests_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."module_permission" ADD CONSTRAINT "module_permission_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "public"."module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."module_permission" ADD CONSTRAINT "module_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rh_document" ADD CONSTRAINT "rh_document_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rh_document" ADD CONSTRAINT "rh_document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_module_permission" ADD CONSTRAINT "role_module_permission_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
