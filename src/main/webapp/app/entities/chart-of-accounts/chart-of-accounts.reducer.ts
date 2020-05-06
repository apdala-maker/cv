import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChartOfAccounts, defaultValue } from 'app/shared/model/chart-of-accounts.model';

export const ACTION_TYPES = {
  FETCH_CHARTOFACCOUNTS_LIST: 'chartOfAccounts/FETCH_CHARTOFACCOUNTS_LIST',
  FETCH_CHARTOFACCOUNTS: 'chartOfAccounts/FETCH_CHARTOFACCOUNTS',
  CREATE_CHARTOFACCOUNTS: 'chartOfAccounts/CREATE_CHARTOFACCOUNTS',
  UPDATE_CHARTOFACCOUNTS: 'chartOfAccounts/UPDATE_CHARTOFACCOUNTS',
  DELETE_CHARTOFACCOUNTS: 'chartOfAccounts/DELETE_CHARTOFACCOUNTS',
  RESET: 'chartOfAccounts/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChartOfAccounts>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ChartOfAccountsState = Readonly<typeof initialState>;

// Reducer

export default (state: ChartOfAccountsState = initialState, action): ChartOfAccountsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHARTOFACCOUNTS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHARTOFACCOUNTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHARTOFACCOUNTS):
    case REQUEST(ACTION_TYPES.UPDATE_CHARTOFACCOUNTS):
    case REQUEST(ACTION_TYPES.DELETE_CHARTOFACCOUNTS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHARTOFACCOUNTS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHARTOFACCOUNTS):
    case FAILURE(ACTION_TYPES.CREATE_CHARTOFACCOUNTS):
    case FAILURE(ACTION_TYPES.UPDATE_CHARTOFACCOUNTS):
    case FAILURE(ACTION_TYPES.DELETE_CHARTOFACCOUNTS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARTOFACCOUNTS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARTOFACCOUNTS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHARTOFACCOUNTS):
    case SUCCESS(ACTION_TYPES.UPDATE_CHARTOFACCOUNTS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHARTOFACCOUNTS):
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

const apiUrl = 'api/chart-of-accounts';

// Actions

export const getEntities: ICrudGetAllAction<IChartOfAccounts> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHARTOFACCOUNTS_LIST,
  payload: axios.get<IChartOfAccounts>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IChartOfAccounts> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHARTOFACCOUNTS,
    payload: axios.get<IChartOfAccounts>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChartOfAccounts> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHARTOFACCOUNTS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChartOfAccounts> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHARTOFACCOUNTS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChartOfAccounts> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHARTOFACCOUNTS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
