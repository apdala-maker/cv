import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IComplaints, defaultValue } from 'app/shared/model/complaints.model';

export const ACTION_TYPES = {
  FETCH_COMPLAINTS_LIST: 'complaints/FETCH_COMPLAINTS_LIST',
  FETCH_COMPLAINTS: 'complaints/FETCH_COMPLAINTS',
  CREATE_COMPLAINTS: 'complaints/CREATE_COMPLAINTS',
  UPDATE_COMPLAINTS: 'complaints/UPDATE_COMPLAINTS',
  DELETE_COMPLAINTS: 'complaints/DELETE_COMPLAINTS',
  RESET: 'complaints/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IComplaints>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ComplaintsState = Readonly<typeof initialState>;

// Reducer

export default (state: ComplaintsState = initialState, action): ComplaintsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPLAINTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPLAINTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPLAINTS):
    case REQUEST(ACTION_TYPES.UPDATE_COMPLAINTS):
    case REQUEST(ACTION_TYPES.DELETE_COMPLAINTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPLAINTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPLAINTS):
    case FAILURE(ACTION_TYPES.CREATE_COMPLAINTS):
    case FAILURE(ACTION_TYPES.UPDATE_COMPLAINTS):
    case FAILURE(ACTION_TYPES.DELETE_COMPLAINTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLAINTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLAINTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPLAINTS):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPLAINTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPLAINTS):
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

const apiUrl = 'api/complaints';

// Actions

export const getEntities: ICrudGetAllAction<IComplaints> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPLAINTS_LIST,
  payload: axios.get<IComplaints>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IComplaints> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPLAINTS,
    payload: axios.get<IComplaints>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IComplaints> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPLAINTS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IComplaints> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPLAINTS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IComplaints> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPLAINTS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
