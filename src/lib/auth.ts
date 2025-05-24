'use server';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';
import { Credentials, AuthResponse, ErrorResponse, User } from '@/types';
import { setTokenCookie } from '@/lib/auth-token';

const DB_PATH = path.resolve(process.cwd(), 'mock.db.json');

type DbUsers = Record<string, User & { password: string }>;

async function readDbUsers(): Promise<DbUsers> {
  try {
    await fs.access(DB_PATH);
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data) as DbUsers;
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return {};
    }
    console.error('Error reading DB file:', error);
    return {};
  }
}

async function writeDbUsers(usersData: DbUsers): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(usersData, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing DB file:', error);
  }
}

export async function findUserByEmail(email: string): Promise<(User & { password: string }) | undefined> {
  const dbUsers = await readDbUsers();
  return dbUsers[email];
}

async function addUser(user: User & { password: string }): Promise<User & { password: string }> {
  const dbUsers = await readDbUsers();
  dbUsers[user.email] = user;
  await writeDbUsers(dbUsers);
  return user;
}

function createUserResponse(user: User & { password: string }): AuthResponse {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
}

async function setupAuth(userId: string, email: string): Promise<void> {
  await setTokenCookie(userId, email);
}

function handleAuthError(error: unknown): ErrorResponse {
  console.error('Authentication error:', error);
  return {
    message: 'An error occurred during authentication',
    status: 500
  };
}

export async function register(credentials: Credentials): Promise<AuthResponse | ErrorResponse> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (await findUserByEmail(credentials.email)) {
      return {
        message: 'User with this email already exists',
        status: 409
      };
    }

    const userId = uuidv4();
    const now = new Date().toISOString();

    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const newUser = {
      id: userId,
      email: credentials.email,
      password: hashedPassword,
      createdAt: now
    };

    await addUser(newUser);

    await setupAuth(userId, credentials.email);

    return createUserResponse(newUser);
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function login(credentials: Credentials): Promise<AuthResponse | ErrorResponse> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = await findUserByEmail(credentials.email);

    if (!user) {
      return {
        message: 'Invalid email or password',
        status: 401
      };
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordValid) {
      return {
        message: 'Invalid email or password',
        status: 401
      };
    }

    await setupAuth(user.id, user.email);

    return createUserResponse(user);
  } catch (error) {
    return handleAuthError(error);
  }
}
