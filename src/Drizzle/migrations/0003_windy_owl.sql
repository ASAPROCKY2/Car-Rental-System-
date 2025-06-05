CREATE TYPE "public"."role" AS ENUM('admin', 'customer');--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "role" "role" DEFAULT 'customer';