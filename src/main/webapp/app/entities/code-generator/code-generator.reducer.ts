import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICodeGenerator, defaultValue } from 'app/shared/model/code-generator.model';

export const ACTION_TYPES = {
  FETCH_CODEGENERATOR_LIST: 'codeGenerator/FETCH_CODEGENERATOR_LIST',
  FETCH_CODEGENERATOR: 'codeGenerator/FETCH_CODEGENERATOR',
  CREATE_CODEGENERATOR: 'codeGenerator/CREATE_CODEGENERATOR',
  UPDATE_CODEGENERATOR: 'codeGenerator/UPDATE_CODEGENERATOR',
  DELETE_CODEGENERATOR: 'codeGenerator/DELETE_CODEGENERATOR',
  RESET: 'codeGenerator/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICodeGenerator>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CodeGeneratorState = Readonly<typeof initialState>;

// Reducer

export default (state: CodeGeneratorState = initialState, action): CodeGeneratorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CODEGENERATOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CODEGENERATOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CODEGENERATOR):
    case REQUEST(ACTION_TYPES.UPDATE_CODEGENERATOR):
    case REQUEST(ACTION_TYPES.DELETE_CODEGENERATOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CODEGENERATOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CODEGENERATOR):
    case FAILURE(ACTION_TYPES.CREATE_CODEGENERATOR):
    case FAILURE(ACTION_TYPES.UPDATE_CODEGENERATOR):
    case FAILURE(ACTION_TYPES.DELETE_CODEGENERATOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CODEGENERATOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CODEGENERATOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CODEGENERATOR):
    case SUCCESS(ACTION_TYPES.UPDATE_CODEGENERATOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CODEGENERATOR):
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

const apiUrl = 'api/code-generators';

// Actions

export const getEntities: ICrudGetAllAction<ICodeGenerator> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CODEGENERATOR_LIST,
  payload: axios.get<ICodeGenerator>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICodeGenerator> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CODEGENERATOR,
    payload: axios.get<ICodeGenerator>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICodeGenerator> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CODEGENERATOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICodeGenerator> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CODEGENERATOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICodeGenerator> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CODEGENERATOR,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
