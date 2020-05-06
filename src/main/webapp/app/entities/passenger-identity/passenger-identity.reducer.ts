import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPassengerIdentity, defaultValue } from 'app/shared/model/passenger-identity.model';

export const ACTION_TYPES = {
  FETCH_PASSENGERIDENTITY_LIST: 'passengerIdentity/FETCH_PASSENGERIDENTITY_LIST',
  FETCH_PASSENGERIDENTITY: 'passengerIdentity/FETCH_PASSENGERIDENTITY',
  CREATE_PASSENGERIDENTITY: 'passengerIdentity/CREATE_PASSENGERIDENTITY',
  UPDATE_PASSENGERIDENTITY: 'passengerIdentity/UPDATE_PASSENGERIDENTITY',
  DELETE_PASSENGERIDENTITY: 'passengerIdentity/DELETE_PASSENGERIDENTITY',
  RESET: 'passengerIdentity/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPassengerIdentity>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PassengerIdentityState = Readonly<typeof initialState>;

// Reducer

export default (state: PassengerIdentityState = initialState, action): PassengerIdentityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PASSENGERIDENTITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PASSENGERIDENTITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PASSENGERIDENTITY):
    case REQUEST(ACTION_TYPES.UPDATE_PASSENGERIDENTITY):
    case REQUEST(ACTION_TYPES.DELETE_PASSENGERIDENTITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PASSENGERIDENTITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PASSENGERIDENTITY):
    case FAILURE(ACTION_TYPES.CREATE_PASSENGERIDENTITY):
    case FAILURE(ACTION_TYPES.UPDATE_PASSENGERIDENTITY):
    case FAILURE(ACTION_TYPES.DELETE_PASSENGERIDENTITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASSENGERIDENTITY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PASSENGERIDENTITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PASSENGERIDENTITY):
    case SUCCESS(ACTION_TYPES.UPDATE_PASSENGERIDENTITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PASSENGERIDENTITY):
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

const apiUrl = 'api/passenger-identities';

// Actions

export const getEntities: ICrudGetAllAction<IPassengerIdentity> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PASSENGERIDENTITY_LIST,
  payload: axios.get<IPassengerIdentity>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPassengerIdentity> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PASSENGERIDENTITY,
    payload: axios.get<IPassengerIdentity>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPassengerIdentity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PASSENGERIDENTITY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPassengerIdentity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PASSENGERIDENTITY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPassengerIdentity> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PASSENGERIDENTITY,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
