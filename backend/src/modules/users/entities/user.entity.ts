import { UserRole } from "@prisma/client";

UserRole
export class userEntity {
    id!:string
    name!: string;
    email!:string;
    role!:string;
    createdAt!: Date;
}

export class UserResponseDto {
  id!: string;
  name!: string;
  email!: string;
  role!: UserRole;
  createdAt!: Date;
}
