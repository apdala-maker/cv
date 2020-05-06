import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITransactionThirdParty, defaultValue } from 'app/shared/model/transaction-third-party.model';

export const ACTION_TYPES = {
  FETCH_TRANSACTIONTHIRDPARTY_LIST: 'transactionThirdParty/FETCH_TRANSACTIONTHIRDPARTY_LIST',
  FETCH_TRANSACTIONTHIRDPARTY: 'transactionThirdParty/FETCH_TRANSACTIONTHIRDPARTY',
  CREATE_TRANSACTIONTHIRDPARTY: 'transactionThirdParty/CREATE_TRANSACTIONTHIRDPARTY',
  UPDATE_TRANSACTIONTHIRDPARTY: 'transactionThirdParty/UPDATE_TRANSACTIONTHIRDPARTY',
  DELETE_TRANSACTIONTHIRDPARTY: 'transactionThirdParty/DELETE_TRANSACTIONTHIRDPARTY',
  RESET: 'transactionThirdParty/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITransactionThirdParty>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TransactionThirdPartyState = Readonly<typeof initialState>;

// Reducer

export default (state: TransactionThirdPartyState = initialState, action): TransactionThirdPartyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSACTIONTHIRDPARTY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSACTIONTHIRDPARTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRANSACTIONTHIRDPARTY):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSACTIONTHIRDPARTY):
    case REQUEST(ACTION_TYPES.DELETE_TRANSACTIONTHIRDPARTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSACTIONTHIRDPARTY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSACTIONTHIRDPARTY):
    case FAILURE(ACTION_TYPES.CREATE_TRANSACTIONTHIRDPARTY):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSACTIONTHIRDPARTY):
    case FAILURE(ACTION_TYPES.DELETE_TRANSACTIONTHIRDPARTY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSACTIONTHIRDPARTY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSACTIONTHIRDPARTY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRANSACTIONTHIRDPARTY):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSACTIONTHIRDPARTY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSACTIONTHIRDPARTY):
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

const apiUrl = 'api/transaction-third-parties';

// Actions

export const getEntities: ICrudGetAllAction<ITransactionThirdParty> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRANSACTIONTHIRDPARTY_LIST,
  payload: axios.get<ITransactionThirdParty>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITransactionThirdParty> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSACTIONTHIRDPARTY,
    payload: axios.get<ITransactionThirdParty>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITransactionThirdParty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSACTIONTHIRDPARTY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITransactionThirdParty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSACTIONTHIRDPARTY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITransactionThirdParty> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSACTIONTHIRDPARTY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
