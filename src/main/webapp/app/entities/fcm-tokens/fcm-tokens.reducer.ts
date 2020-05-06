import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFcmTokens, defaultValue } from 'app/shared/model/fcm-tokens.model';

export const ACTION_TYPES = {
  FETCH_FCMTOKENS_LIST: 'fcmTokens/FETCH_FCMTOKENS_LIST',
  FETCH_FCMTOKENS: 'fcmTokens/FETCH_FCMTOKENS',
  CREATE_FCMTOKENS: 'fcmTokens/CREATE_FCMTOKENS',
  UPDATE_FCMTOKENS: 'fcmTokens/UPDATE_FCMTOKENS',
  DELETE_FCMTOKENS: 'fcmTokens/DELETE_FCMTOKENS',
  RESET: 'fcmTokens/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFcmTokens>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FcmTokensState = Readonly<typeof initialState>;

// Reducer

export default (state: FcmTokensState = initialState, action): FcmTokensState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FCMTOKENS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FCMTOKENS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FCMTOKENS):
    case REQUEST(ACTION_TYPES.UPDATE_FCMTOKENS):
    case REQUEST(ACTION_TYPES.DELETE_FCMTOKENS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FCMTOKENS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FCMTOKENS):
    case FAILURE(ACTION_TYPES.CREATE_FCMTOKENS):
    case FAILURE(ACTION_TYPES.UPDATE_FCMTOKENS):
    case FAILURE(ACTION_TYPES.DELETE_FCMTOKENS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FCMTOKENS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FCMTOKENS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FCMTOKENS):
    case SUCCESS(ACTION_TYPES.UPDATE_FCMTOKENS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FCMTOKENS):
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

const apiUrl = 'api/fcm-tokens';

// Actions

export const getEntities: ICrudGetAllAction<IFcmTokens> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FCMTOKENS_LIST,
  payload: axios.get<IFcmTokens>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFcmTokens> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FCMTOKENS,
    payload: axios.get<IFcmTokens>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFcmTokens> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FCMTOKENS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFcmTokens> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FCMTOKENS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFcmTokens> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FCMTOKENS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
