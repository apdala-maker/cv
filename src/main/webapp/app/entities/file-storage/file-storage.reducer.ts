import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFileStorage, defaultValue } from 'app/shared/model/file-storage.model';

export const ACTION_TYPES = {
  FETCH_FILESTORAGE_LIST: 'fileStorage/FETCH_FILESTORAGE_LIST',
  FETCH_FILESTORAGE: 'fileStorage/FETCH_FILESTORAGE',
  CREATE_FILESTORAGE: 'fileStorage/CREATE_FILESTORAGE',
  UPDATE_FILESTORAGE: 'fileStorage/UPDATE_FILESTORAGE',
  DELETE_FILESTORAGE: 'fileStorage/DELETE_FILESTORAGE',
  RESET: 'fileStorage/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFileStorage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FileStorageState = Readonly<typeof initialState>;

// Reducer

export default (state: FileStorageState = initialState, action): FileStorageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILESTORAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILESTORAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FILESTORAGE):
    case REQUEST(ACTION_TYPES.UPDATE_FILESTORAGE):
    case REQUEST(ACTION_TYPES.DELETE_FILESTORAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FILESTORAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILESTORAGE):
    case FAILURE(ACTION_TYPES.CREATE_FILESTORAGE):
    case FAILURE(ACTION_TYPES.UPDATE_FILESTORAGE):
    case FAILURE(ACTION_TYPES.DELETE_FILESTORAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILESTORAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILESTORAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILESTORAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_FILESTORAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILESTORAGE):
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

const apiUrl = 'api/file-storages';

// Actions

export const getEntities: ICrudGetAllAction<IFileStorage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FILESTORAGE_LIST,
  payload: axios.get<IFileStorage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFileStorage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILESTORAGE,
    payload: axios.get<IFileStorage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFileStorage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILESTORAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFileStorage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILESTORAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFileStorage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILESTORAGE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
