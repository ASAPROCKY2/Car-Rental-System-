ALTER TABLE "customer" ADD COLUMN "role" "role" DEFAULT 'customer';--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "IsVerified";--> statement-breakpoint
ALTER TABLE "customer" DROP COLUMN "verification_code";