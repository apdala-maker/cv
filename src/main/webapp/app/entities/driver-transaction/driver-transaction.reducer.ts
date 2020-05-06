import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDriverTransaction, defaultValue } from 'app/shared/model/driver-transaction.model';

export const ACTION_TYPES = {
  FETCH_DRIVERTRANSACTION_LIST: 'driverTransaction/FETCH_DRIVERTRANSACTION_LIST',
  FETCH_DRIVERTRANSACTION: 'driverTransaction/FETCH_DRIVERTRANSACTION',
  CREATE_DRIVERTRANSACTION: 'driverTransaction/CREATE_DRIVERTRANSACTION',
  UPDATE_DRIVERTRANSACTION: 'driverTransaction/UPDATE_DRIVERTRANSACTION',
  DELETE_DRIVERTRANSACTION: 'driverTransaction/DELETE_DRIVERTRANSACTION',
  RESET: 'driverTransaction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDriverTransaction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DriverTransactionState = Readonly<typeof initialState>;

// Reducer

export default (state: DriverTransactionState = initialState, action): DriverTransactionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRIVERTRANSACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRIVERTRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DRIVERTRANSACTION):
    case REQUEST(ACTION_TYPES.UPDATE_DRIVERTRANSACTION):
    case REQUEST(ACTION_TYPES.DELETE_DRIVERTRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DRIVERTRANSACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRIVERTRANSACTION):
    case FAILURE(ACTION_TYPES.CREATE_DRIVERTRANSACTION):
    case FAILURE(ACTION_TYPES.UPDATE_DRIVERTRANSACTION):
    case FAILURE(ACTION_TYPES.DELETE_DRIVERTRANSACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVERTRANSACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVERTRANSACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRIVERTRANSACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_DRIVERTRANSACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRIVERTRANSACTION):
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

const apiUrl = 'api/driver-transactions';

// Actions

export const getEntities: ICrudGetAllAction<IDriverTransaction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DRIVERTRANSACTION_LIST,
  payload: axios.get<IDriverTransaction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDriverTransaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRIVERTRANSACTION,
    payload: axios.get<IDriverTransaction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDriverTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRIVERTRANSACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDriverTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRIVERTRANSACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDriverTransaction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRIVERTRANSACTION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
