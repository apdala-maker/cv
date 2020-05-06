import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IComplaintsCategory, defaultValue } from 'app/shared/model/complaints-category.model';

export const ACTION_TYPES = {
  FETCH_COMPLAINTSCATEGORY_LIST: 'complaintsCategory/FETCH_COMPLAINTSCATEGORY_LIST',
  FETCH_COMPLAINTSCATEGORY: 'complaintsCategory/FETCH_COMPLAINTSCATEGORY',
  CREATE_COMPLAINTSCATEGORY: 'complaintsCategory/CREATE_COMPLAINTSCATEGORY',
  UPDATE_COMPLAINTSCATEGORY: 'complaintsCategory/UPDATE_COMPLAINTSCATEGORY',
  DELETE_COMPLAINTSCATEGORY: 'complaintsCategory/DELETE_COMPLAINTSCATEGORY',
  RESET: 'complaintsCategory/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IComplaintsCategory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ComplaintsCategoryState = Readonly<typeof initialState>;

// Reducer

export default (state: ComplaintsCategoryState = initialState, action): ComplaintsCategoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPLAINTSCATEGORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPLAINTSCATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPLAINTSCATEGORY):
    case REQUEST(ACTION_TYPES.UPDATE_COMPLAINTSCATEGORY):
    case REQUEST(ACTION_TYPES.DELETE_COMPLAINTSCATEGORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPLAINTSCATEGORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPLAINTSCATEGORY):
    case FAILURE(ACTION_TYPES.CREATE_COMPLAINTSCATEGORY):
    case FAILURE(ACTION_TYPES.UPDATE_COMPLAINTSCATEGORY):
    case FAILURE(ACTION_TYPES.DELETE_COMPLAINTSCATEGORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLAINTSCATEGORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPLAINTSCATEGORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPLAINTSCATEGORY):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPLAINTSCATEGORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPLAINTSCATEGORY):
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

const apiUrl = 'api/complaints-categories';

// Actions

export const getEntities: ICrudGetAllAction<IComplaintsCategory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPLAINTSCATEGORY_LIST,
  payload: axios.get<IComplaintsCategory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IComplaintsCategory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPLAINTSCATEGORY,
    payload: axios.get<IComplaintsCategory>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IComplaintsCategory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPLAINTSCATEGORY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IComplaintsCategory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPLAINTSCATEGORY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IComplaintsCategory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPLAINTSCATEGORY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
