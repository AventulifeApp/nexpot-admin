export const initModuleMock = () => {
  jest.mock('firebase/app', () => {
    return {
      getApps: () => [],
      initializeApp: jest.fn(),
    };
  });
  jest.mock('firebase/firestore', () => {
    return {
      getFirestore: jest.fn(),
      orderBy: jest.fn(),
      query: jest.fn(),
      collection: jest.fn(),
      startAt: jest.fn(),
      endAt: jest.fn(),
      getDocs: jest.fn(),
      limit: jest.fn(),
      limitToLast: jest.fn(),
      doc: jest.fn(),
      docs: jest.fn(),
      getDoc: jest.fn(),
    };
  });
  jest.mock('@firebase/firestore', () => {
    return {
      getFirestore: jest.fn(),
      orderBy: jest.fn(),
      query: jest.fn(),
      collection: jest.fn(),
      startAt: jest.fn(),
      endAt: jest.fn(),
      getDocs: jest.fn(),
      limit: jest.fn(),
      limitToLast: jest.fn(),
      doc: jest.fn(),
      docs: jest.fn(),
      getDoc: jest.fn(),
    };
  });
  jest.mock('firebase/auth', () => {
    return {
      getAuth: jest.fn(),
    };
  });
};
