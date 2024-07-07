import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';

const chance = new Chance();

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (token) => {
  if (!token) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(token);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (token?: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const token = window.localStorage.getItem('token');
        if (token && verifyToken(token)) {
          setSession(token);
          // console.log('token', token);
          const response = await axios.get('/api/account/me');
          const { user } = response.data;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await axios.post('/api/v1/user/uaa/', { username, password });
    // const { token, user } = response.data;
    const { token } = response.data;
    const user = {username: 'test', email: '', firstName: 'test', lastName: 'test'}
    console.log('token', token);
    console.log('user', {user});
    setSession(token);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers!),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
