import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomerTransaction, defaultValue } from 'app/shared/model/customer-transaction.model';

export const ACTION_TYPES = {
  FETCH_CUSTOMERTRANSACTION_LIST: 'customerTransaction/FETCH_CUSTOMERTRANSACTION_LIST',
  FETCH_CUSTOMERTRANSACTION: 'customerTransaction/FETCH_CUSTOMERTRANSACTION',
  CREATE_CUSTOMERTRANSACTION: 'customerTransaction/CREATE_CUSTOMERTRANSACTION',
  UPDATE_CUSTOMERTRANSACTION: 'customerTransaction/UPDATE_CUSTOMERTRANSACTION',
  DELETE_CUSTOMERTRANSACTION: 'customerTransaction/DELETE_CUSTOMERTRANSACTION',
  RESET: 'customerTransaction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomerTransaction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CustomerTransactionState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomerTransactionState = initialState, action): CustomerTransactionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERTRANSACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERTRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMERTRANSACTION):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMERTRANSACTION):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMERTRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERTRANSACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERTRANSACTION):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMERTRANSACTION):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMERTRANSACTION):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMERTRANSACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERTRANSACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERTRANSACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMERTRANSACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMERTRANSACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMERTRANSACTION):
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

const apiUrl = 'api/customer-transactions';

// Actions

export const getEntities: ICrudGetAllAction<ICustomerTransaction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUSTOMERTRANSACTION_LIST,
  payload: axios.get<ICustomerTransaction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICustomerTransaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERTRANSACTION,
    payload: axios.get<ICustomerTransaction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICustomerTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMERTRANSACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomerTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMERTRANSACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomerTransaction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMERTRANSACTION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
