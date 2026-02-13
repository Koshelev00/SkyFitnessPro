import authReducer, { setIsAuth, clearUser } from "./autchSlice";

const initialState = {
  isAuth: false,
  token: "",
  user: null as {
    _id: string;
    email: string;
    selectedCourses: string[];
    courseProgress: string[];
    createdAt: string;
    updatedAt: string;
  } | null,
  email: "",
  status: "idle" as const,
  error: null,
  isOpened: false,
  isOpen: false,
};

type AuthState = typeof initialState;

describe("authSlice reducer", () => {
  it("должен вернуть начальное состояние по умолчанию", () => {
    expect(authReducer(initialState, { type: "UNKNOWN_ACTION" })).toEqual(initialState);
  });

  it("должен обрабатывать setIsAuth", () => {
    const nextState = authReducer(initialState, setIsAuth(true));
    expect(nextState.isAuth).toBe(true);
  });

  it("должен обрабатывать clearUser", () => {
    const loggedInState: AuthState = {
      ...initialState,
      isAuth: true,
      token: "token123",
      user: {
        _id: "1",
        email: "test@test.com",
        selectedCourses: [],
        courseProgress: [],
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
      },
      email: "test@test.com",
    };

    const nextState = authReducer(loggedInState, clearUser());
    expect(nextState.isAuth).toBe(false);
    expect(nextState.token).toBe("");
    expect(nextState.user).toBeNull();
    expect(nextState.email).toBe("");
  });
});
