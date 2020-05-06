import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJournalTransaction, defaultValue } from 'app/shared/model/journal-transaction.model';

export const ACTION_TYPES = {
  FETCH_JOURNALTRANSACTION_LIST: 'journalTransaction/FETCH_JOURNALTRANSACTION_LIST',
  FETCH_JOURNALTRANSACTION: 'journalTransaction/FETCH_JOURNALTRANSACTION',
  CREATE_JOURNALTRANSACTION: 'journalTransaction/CREATE_JOURNALTRANSACTION',
  UPDATE_JOURNALTRANSACTION: 'journalTransaction/UPDATE_JOURNALTRANSACTION',
  DELETE_JOURNALTRANSACTION: 'journalTransaction/DELETE_JOURNALTRANSACTION',
  RESET: 'journalTransaction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJournalTransaction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type JournalTransactionState = Readonly<typeof initialState>;

// Reducer

export default (state: JournalTransactionState = initialState, action): JournalTransactionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JOURNALTRANSACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JOURNALTRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JOURNALTRANSACTION):
    case REQUEST(ACTION_TYPES.UPDATE_JOURNALTRANSACTION):
    case REQUEST(ACTION_TYPES.DELETE_JOURNALTRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JOURNALTRANSACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JOURNALTRANSACTION):
    case FAILURE(ACTION_TYPES.CREATE_JOURNALTRANSACTION):
    case FAILURE(ACTION_TYPES.UPDATE_JOURNALTRANSACTION):
    case FAILURE(ACTION_TYPES.DELETE_JOURNALTRANSACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOURNALTRANSACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_JOURNALTRANSACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JOURNALTRANSACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_JOURNALTRANSACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JOURNALTRANSACTION):
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

const apiUrl = 'api/journal-transactions';

// Actions

export const getEntities: ICrudGetAllAction<IJournalTransaction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_JOURNALTRANSACTION_LIST,
  payload: axios.get<IJournalTransaction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IJournalTransaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JOURNALTRANSACTION,
    payload: axios.get<IJournalTransaction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJournalTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JOURNALTRANSACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJournalTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JOURNALTRANSACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJournalTransaction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JOURNALTRANSACTION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
