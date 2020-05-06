import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRestrictedArea, defaultValue } from 'app/shared/model/restricted-area.model';

export const ACTION_TYPES = {
  FETCH_RESTRICTEDAREA_LIST: 'restrictedArea/FETCH_RESTRICTEDAREA_LIST',
  FETCH_RESTRICTEDAREA: 'restrictedArea/FETCH_RESTRICTEDAREA',
  CREATE_RESTRICTEDAREA: 'restrictedArea/CREATE_RESTRICTEDAREA',
  UPDATE_RESTRICTEDAREA: 'restrictedArea/UPDATE_RESTRICTEDAREA',
  DELETE_RESTRICTEDAREA: 'restrictedArea/DELETE_RESTRICTEDAREA',
  RESET: 'restrictedArea/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRestrictedArea>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RestrictedAreaState = Readonly<typeof initialState>;

// Reducer

export default (state: RestrictedAreaState = initialState, action): RestrictedAreaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RESTRICTEDAREA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RESTRICTEDAREA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_RESTRICTEDAREA):
    case REQUEST(ACTION_TYPES.UPDATE_RESTRICTEDAREA):
    case REQUEST(ACTION_TYPES.DELETE_RESTRICTEDAREA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_RESTRICTEDAREA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RESTRICTEDAREA):
    case FAILURE(ACTION_TYPES.CREATE_RESTRICTEDAREA):
    case FAILURE(ACTION_TYPES.UPDATE_RESTRICTEDAREA):
    case FAILURE(ACTION_TYPES.DELETE_RESTRICTEDAREA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESTRICTEDAREA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESTRICTEDAREA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_RESTRICTEDAREA):
    case SUCCESS(ACTION_TYPES.UPDATE_RESTRICTEDAREA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_RESTRICTEDAREA):
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

const apiUrl = 'api/restricted-areas';

// Actions

export const getEntities: ICrudGetAllAction<IRestrictedArea> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RESTRICTEDAREA_LIST,
  payload: axios.get<IRestrictedArea>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRestrictedArea> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RESTRICTEDAREA,
    payload: axios.get<IRestrictedArea>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRestrictedArea> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RESTRICTEDAREA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRestrictedArea> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RESTRICTEDAREA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRestrictedArea> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RESTRICTEDAREA,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
