import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAreaFileTypes, defaultValue } from 'app/shared/model/area-file-types.model';

export const ACTION_TYPES = {
  FETCH_AREAFILETYPES_LIST: 'areaFileTypes/FETCH_AREAFILETYPES_LIST',
  FETCH_AREAFILETYPES: 'areaFileTypes/FETCH_AREAFILETYPES',
  CREATE_AREAFILETYPES: 'areaFileTypes/CREATE_AREAFILETYPES',
  UPDATE_AREAFILETYPES: 'areaFileTypes/UPDATE_AREAFILETYPES',
  DELETE_AREAFILETYPES: 'areaFileTypes/DELETE_AREAFILETYPES',
  RESET: 'areaFileTypes/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAreaFileTypes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AreaFileTypesState = Readonly<typeof initialState>;

// Reducer

export default (state: AreaFileTypesState = initialState, action): AreaFileTypesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AREAFILETYPES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AREAFILETYPES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AREAFILETYPES):
    case REQUEST(ACTION_TYPES.UPDATE_AREAFILETYPES):
    case REQUEST(ACTION_TYPES.DELETE_AREAFILETYPES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AREAFILETYPES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AREAFILETYPES):
    case FAILURE(ACTION_TYPES.CREATE_AREAFILETYPES):
    case FAILURE(ACTION_TYPES.UPDATE_AREAFILETYPES):
    case FAILURE(ACTION_TYPES.DELETE_AREAFILETYPES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AREAFILETYPES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AREAFILETYPES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AREAFILETYPES):
    case SUCCESS(ACTION_TYPES.UPDATE_AREAFILETYPES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AREAFILETYPES):
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

const apiUrl = 'api/area-file-types';

// Actions

export const getEntities: ICrudGetAllAction<IAreaFileTypes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AREAFILETYPES_LIST,
  payload: axios.get<IAreaFileTypes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAreaFileTypes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AREAFILETYPES,
    payload: axios.get<IAreaFileTypes>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAreaFileTypes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AREAFILETYPES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAreaFileTypes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AREAFILETYPES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAreaFileTypes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AREAFILETYPES,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
