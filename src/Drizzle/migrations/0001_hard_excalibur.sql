ALTER TABLE "customer" ADD COLUMN "IsVerified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "verification_code" varchar(10);