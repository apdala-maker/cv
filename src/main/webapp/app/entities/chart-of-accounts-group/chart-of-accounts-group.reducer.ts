import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IChartOfAccountsGroup, defaultValue } from 'app/shared/model/chart-of-accounts-group.model';

export const ACTION_TYPES = {
  FETCH_CHARTOFACCOUNTSGROUP_LIST: 'chartOfAccountsGroup/FETCH_CHARTOFACCOUNTSGROUP_LIST',
  FETCH_CHARTOFACCOUNTSGROUP: 'chartOfAccountsGroup/FETCH_CHARTOFACCOUNTSGROUP',
  CREATE_CHARTOFACCOUNTSGROUP: 'chartOfAccountsGroup/CREATE_CHARTOFACCOUNTSGROUP',
  UPDATE_CHARTOFACCOUNTSGROUP: 'chartOfAccountsGroup/UPDATE_CHARTOFACCOUNTSGROUP',
  DELETE_CHARTOFACCOUNTSGROUP: 'chartOfAccountsGroup/DELETE_CHARTOFACCOUNTSGROUP',
  RESET: 'chartOfAccountsGroup/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChartOfAccountsGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ChartOfAccountsGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: ChartOfAccountsGroupState = initialState, action): ChartOfAccountsGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHARTOFACCOUNTSGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHARTOFACCOUNTSGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHARTOFACCOUNTSGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_CHARTOFACCOUNTSGROUP):
    case REQUEST(ACTION_TYPES.DELETE_CHARTOFACCOUNTSGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHARTOFACCOUNTSGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHARTOFACCOUNTSGROUP):
    case FAILURE(ACTION_TYPES.CREATE_CHARTOFACCOUNTSGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_CHARTOFACCOUNTSGROUP):
    case FAILURE(ACTION_TYPES.DELETE_CHARTOFACCOUNTSGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARTOFACCOUNTSGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHARTOFACCOUNTSGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHARTOFACCOUNTSGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_CHARTOFACCOUNTSGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHARTOFACCOUNTSGROUP):
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

const apiUrl = 'api/chart-of-accounts-groups';

// Actions

export const getEntities: ICrudGetAllAction<IChartOfAccountsGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CHARTOFACCOUNTSGROUP_LIST,
  payload: axios.get<IChartOfAccountsGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IChartOfAccountsGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHARTOFACCOUNTSGROUP,
    payload: axios.get<IChartOfAccountsGroup>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChartOfAccountsGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHARTOFACCOUNTSGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChartOfAccountsGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHARTOFACCOUNTSGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChartOfAccountsGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHARTOFACCOUNTSGROUP,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
