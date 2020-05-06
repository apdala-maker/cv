import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IThirdPartyChargeDistributionSchedule, defaultValue } from 'app/shared/model/third-party-charge-distribution-schedule.model';

export const ACTION_TYPES = {
  FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE_LIST: 'thirdPartyChargeDistributionSchedule/FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE_LIST',
  FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE: 'thirdPartyChargeDistributionSchedule/FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE',
  CREATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE: 'thirdPartyChargeDistributionSchedule/CREATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE',
  UPDATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE: 'thirdPartyChargeDistributionSchedule/UPDATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE',
  DELETE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE: 'thirdPartyChargeDistributionSchedule/DELETE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE',
  RESET: 'thirdPartyChargeDistributionSchedule/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IThirdPartyChargeDistributionSchedule>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ThirdPartyChargeDistributionScheduleState = Readonly<typeof initialState>;

// Reducer

export default (state: ThirdPartyChargeDistributionScheduleState = initialState, action): ThirdPartyChargeDistributionScheduleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
    case REQUEST(ACTION_TYPES.UPDATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
    case REQUEST(ACTION_TYPES.DELETE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
    case FAILURE(ACTION_TYPES.CREATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
    case FAILURE(ACTION_TYPES.UPDATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
    case FAILURE(ACTION_TYPES.DELETE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
    case SUCCESS(ACTION_TYPES.UPDATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE):
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

const apiUrl = 'api/third-party-charge-distribution-schedules';

// Actions

export const getEntities: ICrudGetAllAction<IThirdPartyChargeDistributionSchedule> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE_LIST,
  payload: axios.get<IThirdPartyChargeDistributionSchedule>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IThirdPartyChargeDistributionSchedule> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE,
    payload: axios.get<IThirdPartyChargeDistributionSchedule>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IThirdPartyChargeDistributionSchedule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IThirdPartyChargeDistributionSchedule> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IThirdPartyChargeDistributionSchedule> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THIRDPARTYCHARGEDISTRIBUTIONSCHEDULE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
