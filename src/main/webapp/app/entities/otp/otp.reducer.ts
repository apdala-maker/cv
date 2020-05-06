import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOTP, defaultValue } from 'app/shared/model/otp.model';

export const ACTION_TYPES = {
  FETCH_OTP_LIST: 'oTP/FETCH_OTP_LIST',
  FETCH_OTP: 'oTP/FETCH_OTP',
  CREATE_OTP: 'oTP/CREATE_OTP',
  UPDATE_OTP: 'oTP/UPDATE_OTP',
  DELETE_OTP: 'oTP/DELETE_OTP',
  RESET: 'oTP/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOTP>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type OTPState = Readonly<typeof initialState>;

// Reducer

export default (state: OTPState = initialState, action): OTPState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OTP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OTP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_OTP):
    case REQUEST(ACTION_TYPES.UPDATE_OTP):
    case REQUEST(ACTION_TYPES.DELETE_OTP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_OTP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OTP):
    case FAILURE(ACTION_TYPES.CREATE_OTP):
    case FAILURE(ACTION_TYPES.UPDATE_OTP):
    case FAILURE(ACTION_TYPES.DELETE_OTP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_OTP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_OTP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_OTP):
    case SUCCESS(ACTION_TYPES.UPDATE_OTP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_OTP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/otps';

// Actions

export const getEntities: ICrudGetAllAction<IOTP> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_OTP_LIST,
  payload: axios.get<IOTP>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IOTP> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_OTP,
    payload: axios.get<IOTP>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOTP> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OTP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOTP> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OTP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOTP> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OTP,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
