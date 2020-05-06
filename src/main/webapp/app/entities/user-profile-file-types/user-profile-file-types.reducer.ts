import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserProfileFileTypes, defaultValue } from 'app/shared/model/user-profile-file-types.model';

export const ACTION_TYPES = {
  FETCH_USERPROFILEFILETYPES_LIST: 'userProfileFileTypes/FETCH_USERPROFILEFILETYPES_LIST',
  FETCH_USERPROFILEFILETYPES: 'userProfileFileTypes/FETCH_USERPROFILEFILETYPES',
  CREATE_USERPROFILEFILETYPES: 'userProfileFileTypes/CREATE_USERPROFILEFILETYPES',
  UPDATE_USERPROFILEFILETYPES: 'userProfileFileTypes/UPDATE_USERPROFILEFILETYPES',
  DELETE_USERPROFILEFILETYPES: 'userProfileFileTypes/DELETE_USERPROFILEFILETYPES',
  RESET: 'userProfileFileTypes/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserProfileFileTypes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserProfileFileTypesState = Readonly<typeof initialState>;

// Reducer

export default (state: UserProfileFileTypesState = initialState, action): UserProfileFileTypesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERPROFILEFILETYPES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERPROFILEFILETYPES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERPROFILEFILETYPES):
    case REQUEST(ACTION_TYPES.UPDATE_USERPROFILEFILETYPES):
    case REQUEST(ACTION_TYPES.DELETE_USERPROFILEFILETYPES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERPROFILEFILETYPES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERPROFILEFILETYPES):
    case FAILURE(ACTION_TYPES.CREATE_USERPROFILEFILETYPES):
    case FAILURE(ACTION_TYPES.UPDATE_USERPROFILEFILETYPES):
    case FAILURE(ACTION_TYPES.DELETE_USERPROFILEFILETYPES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILEFILETYPES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILEFILETYPES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERPROFILEFILETYPES):
    case SUCCESS(ACTION_TYPES.UPDATE_USERPROFILEFILETYPES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERPROFILEFILETYPES):
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

const apiUrl = 'api/user-profile-file-types';

// Actions

export const getEntities: ICrudGetAllAction<IUserProfileFileTypes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERPROFILEFILETYPES_LIST,
  payload: axios.get<IUserProfileFileTypes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserProfileFileTypes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERPROFILEFILETYPES,
    payload: axios.get<IUserProfileFileTypes>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserProfileFileTypes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERPROFILEFILETYPES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserProfileFileTypes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERPROFILEFILETYPES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserProfileFileTypes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERPROFILEFILETYPES,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
