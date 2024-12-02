jest.mock('src/services/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    organization: {
      findMany: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
    },
    user: {
      findUnique: jest.fn().mockResolvedValue(null),
    },
    time: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  })),
}));

jest.mock('src/services/organization/organization.service', () => ({
  OrganizationService: jest.fn().mockImplementation(() => ({
    getOrganizations: jest.fn().mockResolvedValue([]),
  })),
}));

jest.mock('src/services/time/time.service', () => ({
  TimeService: jest.fn().mockImplementation(() => ({
    findAll: jest.fn().mockResolvedValue([]),
  })),
}));

jest.mock('src/services/user/user.service', () => ({
  UserService: jest.fn().mockImplementation(() => ({
    createUser: jest.fn().mockResolvedValue({}),
    findUser: jest.fn().mockResolvedValue(null),
  })),
}));

jest.mock('src/services/auth/auth.service', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    login: jest.fn().mockResolvedValue({}),
    register: jest.fn().mockResolvedValue({}),
  })),
}));
