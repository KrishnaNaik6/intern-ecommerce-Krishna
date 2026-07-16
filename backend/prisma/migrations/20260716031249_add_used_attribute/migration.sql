-- AlterTable
ALTER TABLE "PasswordResetToken" ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "PasswordResetToken_token_idx" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");
