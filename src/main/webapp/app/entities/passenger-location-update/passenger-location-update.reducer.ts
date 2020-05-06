import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPassengerLocationUpdate, defaultValue } from 'app/shared/model/passenger-location-update.model';

export const ACTION_TYPES = {
  FETCH_PASSENGERLOCATIONUPDATE_LIST: 'passengerLocationUpdate/FETCH_PASSENGERLOCATIONUPDATE_LIST',
  FETCH_PASSENGERLOCATIONUPDATE: 'passengerLocationUpdate/FETCH_PASSENGERLOCATIONUPDATE',
  CREATE_PASSENGERLOCATIONUPDATE: 'passengerLocationUpdate/CREATE_PASSENGERLOCATIONUPDATE',
  UPDATE_PASSENGERLOCATIONUPDATE: 'passengerLocationUpdate/UPDATE_PASSENGERLOCATIONUPDATE',
  DELETE_PASSENGERLOCATIONUPDATE: 'passengerLocationUpdate/DELETE_PASSENGERLOCATIONUPDATE',
  RESET: 'passengerLocationUpdate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPassengerLocationUpdate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PassengerLocationUpdateState = Readonly<typeof initialState>;

// Reducer

export default (state: PassengerLocationUpdateState = initialState, action): PassengerLocationUpdateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PASSENGERLOCATIONUPDATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PASSENGERLOCATIONUPDATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PASSENGERLOCATIONUPDATE):
    case REQUEST(ACTION_TYPES.UPDATE_PASSENGERLOCATIONUPDATE):
    case REQUEST(ACTION_TYPES.DELETE_PASSENGERLOCATIONUPDATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PASSENGERLOCATIONUPDATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PASSENGERLOCATIONUPDATE):
    case FAILURE(ACTION_TYPES.CREATE_PASSENGERLOCATIONUPDATE):
    case FAILURE(ACTION_TYPES.UPDATE_PASSENGERLOCATIONUPDATE):
    case FAILURE(ACTION_TYPES.DELETE_PASSENGERLOCATIONUPDATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASSENGERLOCATIONUPDATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASSENGERLOCATIONUPDATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PASSENGERLOCATIONUPDATE):
    case SUCCESS(ACTION_TYPES.UPDATE_PASSENGERLOCATIONUPDATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PASSENGERLOCATIONUPDATE):
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

const apiUrl = 'api/passenger-location-updates';

// Actions

export const getEntities: ICrudGetAllAction<IPassengerLocationUpdate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PASSENGERLOCATIONUPDATE_LIST,
  payload: axios.get<IPassengerLocationUpdate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPassengerLocationUpdate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PASSENGERLOCATIONUPDATE,
    payload: axios.get<IPassengerLocationUpdate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPassengerLocationUpdate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PASSENGERLOCATIONUPDATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPassengerLocationUpdate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PASSENGERLOCATIONUPDATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPassengerLocationUpdate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PASSENGERLOCATIONUPDATE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
