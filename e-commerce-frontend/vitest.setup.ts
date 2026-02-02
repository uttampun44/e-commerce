import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock Clerk
vi.mock('@clerk/clerk-react', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: false,
    userId: null,
    sessionId: null,
    getToken: vi.fn(),
    signOut: vi.fn(),
  }),
  useUser: () => ({
    isLoaded: true,
    isSignedIn: false,
    user: null,
  }),
  useSession: () => ({
    isLoaded: true,
    session: null,
  }),
  useClerk: () => ({
    openSignIn: vi.fn(),
    signOut: vi.fn(),
  }),
  useSignIn: () => ({
    isLoaded: true,
    signIn: vi.fn().mockResolvedValue({ createdSessionId: null }),
  }),
  useSignUp: () => ({
    isLoaded: true,
    signUp: vi.fn().mockResolvedValue({ createdUserId: null }),
  }),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

afterEach(() => {
  cleanup();
  localStorageMock.clear();
});

