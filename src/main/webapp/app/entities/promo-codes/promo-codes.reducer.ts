import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPromoCodes, defaultValue } from 'app/shared/model/promo-codes.model';

export const ACTION_TYPES = {
  FETCH_PROMOCODES_LIST: 'promoCodes/FETCH_PROMOCODES_LIST',
  FETCH_PROMOCODES: 'promoCodes/FETCH_PROMOCODES',
  CREATE_PROMOCODES: 'promoCodes/CREATE_PROMOCODES',
  UPDATE_PROMOCODES: 'promoCodes/UPDATE_PROMOCODES',
  DELETE_PROMOCODES: 'promoCodes/DELETE_PROMOCODES',
  RESET: 'promoCodes/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPromoCodes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PromoCodesState = Readonly<typeof initialState>;

// Reducer

export default (state: PromoCodesState = initialState, action): PromoCodesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROMOCODES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROMOCODES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROMOCODES):
    case REQUEST(ACTION_TYPES.UPDATE_PROMOCODES):
    case REQUEST(ACTION_TYPES.DELETE_PROMOCODES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROMOCODES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROMOCODES):
    case FAILURE(ACTION_TYPES.CREATE_PROMOCODES):
    case FAILURE(ACTION_TYPES.UPDATE_PROMOCODES):
    case FAILURE(ACTION_TYPES.DELETE_PROMOCODES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROMOCODES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROMOCODES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROMOCODES):
    case SUCCESS(ACTION_TYPES.UPDATE_PROMOCODES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROMOCODES):
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

const apiUrl = 'api/promo-codes';

// Actions

export const getEntities: ICrudGetAllAction<IPromoCodes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROMOCODES_LIST,
  payload: axios.get<IPromoCodes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPromoCodes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROMOCODES,
    payload: axios.get<IPromoCodes>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPromoCodes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROMOCODES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPromoCodes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROMOCODES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPromoCodes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROMOCODES,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
