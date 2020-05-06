import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIdentityUser, defaultValue } from 'app/shared/model/identity-user.model';

export const ACTION_TYPES = {
  FETCH_IDENTITYUSER_LIST: 'identityUser/FETCH_IDENTITYUSER_LIST',
  FETCH_IDENTITYUSER: 'identityUser/FETCH_IDENTITYUSER',
  CREATE_IDENTITYUSER: 'identityUser/CREATE_IDENTITYUSER',
  UPDATE_IDENTITYUSER: 'identityUser/UPDATE_IDENTITYUSER',
  DELETE_IDENTITYUSER: 'identityUser/DELETE_IDENTITYUSER',
  RESET: 'identityUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIdentityUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type IdentityUserState = Readonly<typeof initialState>;

// Reducer

export default (state: IdentityUserState = initialState, action): IdentityUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IDENTITYUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IDENTITYUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IDENTITYUSER):
    case REQUEST(ACTION_TYPES.UPDATE_IDENTITYUSER):
    case REQUEST(ACTION_TYPES.DELETE_IDENTITYUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IDENTITYUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IDENTITYUSER):
    case FAILURE(ACTION_TYPES.CREATE_IDENTITYUSER):
    case FAILURE(ACTION_TYPES.UPDATE_IDENTITYUSER):
    case FAILURE(ACTION_TYPES.DELETE_IDENTITYUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IDENTITYUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IDENTITYUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IDENTITYUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_IDENTITYUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IDENTITYUSER):
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

const apiUrl = 'api/identity-users';

// Actions

export const getEntities: ICrudGetAllAction<IIdentityUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IDENTITYUSER_LIST,
  payload: axios.get<IIdentityUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IIdentityUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IDENTITYUSER,
    payload: axios.get<IIdentityUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIdentityUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IDENTITYUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIdentityUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IDENTITYUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIdentityUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IDENTITYUSER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
