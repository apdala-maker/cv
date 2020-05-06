import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPriceMongoModel, defaultValue } from 'app/shared/model/price-mongo-model.model';

export const ACTION_TYPES = {
  FETCH_PRICEMONGOMODEL_LIST: 'priceMongoModel/FETCH_PRICEMONGOMODEL_LIST',
  FETCH_PRICEMONGOMODEL: 'priceMongoModel/FETCH_PRICEMONGOMODEL',
  CREATE_PRICEMONGOMODEL: 'priceMongoModel/CREATE_PRICEMONGOMODEL',
  UPDATE_PRICEMONGOMODEL: 'priceMongoModel/UPDATE_PRICEMONGOMODEL',
  DELETE_PRICEMONGOMODEL: 'priceMongoModel/DELETE_PRICEMONGOMODEL',
  RESET: 'priceMongoModel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPriceMongoModel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PriceMongoModelState = Readonly<typeof initialState>;

// Reducer

export default (state: PriceMongoModelState = initialState, action): PriceMongoModelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRICEMONGOMODEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRICEMONGOMODEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRICEMONGOMODEL):
    case REQUEST(ACTION_TYPES.UPDATE_PRICEMONGOMODEL):
    case REQUEST(ACTION_TYPES.DELETE_PRICEMONGOMODEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRICEMONGOMODEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRICEMONGOMODEL):
    case FAILURE(ACTION_TYPES.CREATE_PRICEMONGOMODEL):
    case FAILURE(ACTION_TYPES.UPDATE_PRICEMONGOMODEL):
    case FAILURE(ACTION_TYPES.DELETE_PRICEMONGOMODEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRICEMONGOMODEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRICEMONGOMODEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRICEMONGOMODEL):
    case SUCCESS(ACTION_TYPES.UPDATE_PRICEMONGOMODEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRICEMONGOMODEL):
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

const apiUrl = 'api/price-mongo-models';

// Actions

export const getEntities: ICrudGetAllAction<IPriceMongoModel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRICEMONGOMODEL_LIST,
  payload: axios.get<IPriceMongoModel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPriceMongoModel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRICEMONGOMODEL,
    payload: axios.get<IPriceMongoModel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPriceMongoModel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRICEMONGOMODEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPriceMongoModel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRICEMONGOMODEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPriceMongoModel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRICEMONGOMODEL,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
