import userReducer, {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  clearError
} from './userSlice';

describe('user reducer', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
  };

  const mockUser = {
    email: 'test@test.com',
    name: 'Test User'
  };

  it('should return initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('register user', () => {
    it('should handle registerUser.pending', () => {
      const state = userReducer(initialState, {
        type: registerUser.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle registerUser.fulfilled', () => {
      const mockResponse = {
        success: true,
        user: mockUser,
        accessToken: '',
        refreshToken: ''
      };
      const state = userReducer(
        initialState,
        registerUser.fulfilled(mockResponse, '', {
          email: 'test@test.com',
          password: '123456',
          name: 'Test User'
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle registerUser.rejected', () => {
      const state = userReducer(
        initialState,
        registerUser.rejected(new Error('Ошибка регистрации'), '', {
          email: '',
          password: '',
          name: ''
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка регистрации');
    });
  });

  describe('login user', () => {
    it('should handle loginUser.pending', () => {
      const state = userReducer(initialState, { type: loginUser.pending.type });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle loginUser.fulfilled', () => {
      const mockResponse = {
        success: true,
        user: mockUser,
        accessToken: '',
        refreshToken: ''
      };
      const state = userReducer(
        initialState,
        loginUser.fulfilled(mockResponse, '', {
          email: 'test@test.com',
          password: '123456'
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle loginUser.rejected', () => {
      const state = userReducer(
        initialState,
        loginUser.rejected(new Error('Ошибка входа'), '', {
          email: '',
          password: ''
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка входа');
    });
  });

  describe('logout user', () => {
    it('should handle logoutUser.fulfilled', () => {
      const authenticatedState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true
      };

      const state = userReducer(
        authenticatedState,
        logoutUser.fulfilled(undefined, '')
      );

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('get user', () => {
    it('should handle getUser.pending', () => {
      const state = userReducer(initialState, { type: getUser.pending.type });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle getUser.fulfilled', () => {
      const state = userReducer(initialState, getUser.fulfilled(mockUser, ''));

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle getUser.rejected', () => {
      const state = userReducer(initialState, getUser.rejected(null, ''));

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('update user', () => {
    it('should handle updateUser.pending', () => {
      const state = userReducer(initialState, {
        type: updateUser.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle updateUser.fulfilled', () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      const state = userReducer(
        { ...initialState, user: mockUser },
        updateUser.fulfilled(updatedUser, '', { name: 'Updated Name' })
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(updatedUser);
    });

    it('should handle updateUser.rejected', () => {
      const state = userReducer(
        initialState,
        updateUser.rejected(new Error('Ошибка обновления профиля'), '', {})
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка обновления профиля');
    });
  });

  describe('clear error', () => {
    it('should handle clearError', () => {
      const stateWithError = { ...initialState, error: 'Some error' };
      const state = userReducer(stateWithError, clearError());
      expect(state.error).toBeNull();
    });
  });
});
