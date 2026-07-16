import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";

import * as bcrypt from "bcrypt"

import { PrismaService } from "src/common/prisma/prisma.service";
import { MailService } from "src/common/mail/mail.service";
import { UsersService } from "src/modules/users/users.service";
import { RegisterDto } from "src/modules/auth/dto/register.dto";

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

const jwtMock = {
    signAsync: jest.fn(),
};
const configMock = {
    get: jest.fn(),
};
const mailMock = {
    sendForgotPasswordEmail: jest.fn(),
};
const usersMock = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findPublicById: jest.fn(),
};

const prismaMock = {
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    },

    passwordResetToken: {
        create: jest.fn(),
        findUnique: jest.fn(),
        deleteMany: jest.fn(),
        update: jest.fn(),
    },

    refreshToken: {
        create: jest.fn(),
        findUnique: jest.fn(),
        deleteMany: jest.fn(),
    },
    $transaction: jest.fn(),

};

jwtMock.signAsync
    .mockResolvedValueOnce("access-token")
    .mockResolvedValueOnce("refresh-token");

configMock.get.mockImplementation((key: string) => {
    switch (key) {
        case "JWT_ACCESS_SECRET":
            return "access-secret";

        case "JWT_REFRESH_SECRET":
            return "refresh-secret";

        case "FRONTEND_URL":
            return "http://localhost:3000";

        default:
            return null;
    }
});

const registerDto = {
    name: "Krishna",
    email: "krishna@gmail.com",
    password: "password123",
};

describe("AuthService", () => {
    let service: AuthService;
    let prisma: any;
    let jwtService: any;
    let configService: any;
    let mailService: any;

    beforeEach(async () => {

        const module: TestingModule =
            await Test.createTestingModule({
                providers: [
                    AuthService,
                    {
                        provide: PrismaService,
                        useValue: prismaMock,
                    },
                    {
                        provide: UsersService,
                        useValue: usersMock
                    },
                    {
                        provide: JwtService,
                        useValue: jwtMock,
                    },
                    {
                        provide: ConfigService,
                        useValue: configMock,
                    },
                    {
                        provide: MailService,
                        useValue: mailMock,
                    },],
            }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get(PrismaService);
        jwtService = module.get(JwtService);
        configService = module.get(ConfigService);
        mailService = module.get(MailService);

        jest.clearAllMocks();

    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should register a new user successfully", async () => {

        // Arrange

        usersMock.findByEmail.mockResolvedValue(null);

        (bcrypt.hash as jest.Mock).mockResolvedValue(
            "hashed-password",
        );

        usersMock.create.mockResolvedValue({
            ...fakeUser,
            passwordHash: "hashed-password",
        });

        jwtMock.signAsync
            .mockResolvedValueOnce("access-token")
            .mockResolvedValueOnce("refresh-token");

        // Act

        const result =
            await service.register(registerDto);

        // Assert

        expect(usersMock.findByEmail)
            .toHaveBeenCalledWith(
                registerDto.email,
            );

        expect(bcrypt.hash)
            .toHaveBeenCalledWith(
                registerDto.password,
                12,
            );

        expect(usersMock.create)
            .toHaveBeenCalledWith({
                name: registerDto.name,
                email: registerDto.email,
                passwordHash: "hashed-password",
            });

        expect(jwtMock.signAsync)
            .toHaveBeenCalledTimes(2);

        expect(result).toEqual({
            user: {
                id: fakeUser.id,
                name: fakeUser.name,
                email: fakeUser.email,
                role: fakeUser.role,
            },
            accessToken: fakeTokens.accessToken,
            refreshToken: fakeTokens.refreshToken,
        });

    });
});

const fakeTokens = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
};

const fakeUser = {
    id: "user-id",
    name: "Krishna",
    email: "krishna@gmail.com",
    password: "hashed-password",
    role: "USER",
};
