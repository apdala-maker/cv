import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISmsModel, defaultValue } from 'app/shared/model/sms-model.model';

export const ACTION_TYPES = {
  FETCH_SMSMODEL_LIST: 'smsModel/FETCH_SMSMODEL_LIST',
  FETCH_SMSMODEL: 'smsModel/FETCH_SMSMODEL',
  CREATE_SMSMODEL: 'smsModel/CREATE_SMSMODEL',
  UPDATE_SMSMODEL: 'smsModel/UPDATE_SMSMODEL',
  DELETE_SMSMODEL: 'smsModel/DELETE_SMSMODEL',
  RESET: 'smsModel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISmsModel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SmsModelState = Readonly<typeof initialState>;

// Reducer

export default (state: SmsModelState = initialState, action): SmsModelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SMSMODEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SMSMODEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SMSMODEL):
    case REQUEST(ACTION_TYPES.UPDATE_SMSMODEL):
    case REQUEST(ACTION_TYPES.DELETE_SMSMODEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SMSMODEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SMSMODEL):
    case FAILURE(ACTION_TYPES.CREATE_SMSMODEL):
    case FAILURE(ACTION_TYPES.UPDATE_SMSMODEL):
    case FAILURE(ACTION_TYPES.DELETE_SMSMODEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SMSMODEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SMSMODEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SMSMODEL):
    case SUCCESS(ACTION_TYPES.UPDATE_SMSMODEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SMSMODEL):
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

const apiUrl = 'api/sms-models';

// Actions

export const getEntities: ICrudGetAllAction<ISmsModel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SMSMODEL_LIST,
  payload: axios.get<ISmsModel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISmsModel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SMSMODEL,
    payload: axios.get<ISmsModel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISmsModel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SMSMODEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISmsModel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SMSMODEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISmsModel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SMSMODEL,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
