import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITripManagement, defaultValue } from 'app/shared/model/trip-management.model';

export const ACTION_TYPES = {
  FETCH_TRIPMANAGEMENT_LIST: 'tripManagement/FETCH_TRIPMANAGEMENT_LIST',
  FETCH_TRIPMANAGEMENT: 'tripManagement/FETCH_TRIPMANAGEMENT',
  CREATE_TRIPMANAGEMENT: 'tripManagement/CREATE_TRIPMANAGEMENT',
  UPDATE_TRIPMANAGEMENT: 'tripManagement/UPDATE_TRIPMANAGEMENT',
  DELETE_TRIPMANAGEMENT: 'tripManagement/DELETE_TRIPMANAGEMENT',
  RESET: 'tripManagement/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITripManagement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TripManagementState = Readonly<typeof initialState>;

// Reducer

export default (state: TripManagementState = initialState, action): TripManagementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRIPMANAGEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRIPMANAGEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRIPMANAGEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_TRIPMANAGEMENT):
    case REQUEST(ACTION_TYPES.DELETE_TRIPMANAGEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRIPMANAGEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRIPMANAGEMENT):
    case FAILURE(ACTION_TYPES.CREATE_TRIPMANAGEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_TRIPMANAGEMENT):
    case FAILURE(ACTION_TYPES.DELETE_TRIPMANAGEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIPMANAGEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIPMANAGEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRIPMANAGEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_TRIPMANAGEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRIPMANAGEMENT):
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

const apiUrl = 'api/trip-managements';

// Actions

export const getEntities: ICrudGetAllAction<ITripManagement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRIPMANAGEMENT_LIST,
  payload: axios.get<ITripManagement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITripManagement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRIPMANAGEMENT,
    payload: axios.get<ITripManagement>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITripManagement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRIPMANAGEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITripManagement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRIPMANAGEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITripManagement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRIPMANAGEMENT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
