import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMongoFileTypes, defaultValue } from 'app/shared/model/mongo-file-types.model';

export const ACTION_TYPES = {
  FETCH_MONGOFILETYPES_LIST: 'mongoFileTypes/FETCH_MONGOFILETYPES_LIST',
  FETCH_MONGOFILETYPES: 'mongoFileTypes/FETCH_MONGOFILETYPES',
  CREATE_MONGOFILETYPES: 'mongoFileTypes/CREATE_MONGOFILETYPES',
  UPDATE_MONGOFILETYPES: 'mongoFileTypes/UPDATE_MONGOFILETYPES',
  DELETE_MONGOFILETYPES: 'mongoFileTypes/DELETE_MONGOFILETYPES',
  RESET: 'mongoFileTypes/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMongoFileTypes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MongoFileTypesState = Readonly<typeof initialState>;

// Reducer

export default (state: MongoFileTypesState = initialState, action): MongoFileTypesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MONGOFILETYPES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MONGOFILETYPES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MONGOFILETYPES):
    case REQUEST(ACTION_TYPES.UPDATE_MONGOFILETYPES):
    case REQUEST(ACTION_TYPES.DELETE_MONGOFILETYPES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MONGOFILETYPES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MONGOFILETYPES):
    case FAILURE(ACTION_TYPES.CREATE_MONGOFILETYPES):
    case FAILURE(ACTION_TYPES.UPDATE_MONGOFILETYPES):
    case FAILURE(ACTION_TYPES.DELETE_MONGOFILETYPES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MONGOFILETYPES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MONGOFILETYPES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MONGOFILETYPES):
    case SUCCESS(ACTION_TYPES.UPDATE_MONGOFILETYPES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MONGOFILETYPES):
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

const apiUrl = 'api/mongo-file-types';

// Actions

export const getEntities: ICrudGetAllAction<IMongoFileTypes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MONGOFILETYPES_LIST,
  payload: axios.get<IMongoFileTypes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMongoFileTypes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MONGOFILETYPES,
    payload: axios.get<IMongoFileTypes>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMongoFileTypes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MONGOFILETYPES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMongoFileTypes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MONGOFILETYPES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMongoFileTypes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MONGOFILETYPES,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
