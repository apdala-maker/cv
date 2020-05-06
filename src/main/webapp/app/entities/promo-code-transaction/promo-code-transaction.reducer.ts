import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPromoCodeTransaction, defaultValue } from 'app/shared/model/promo-code-transaction.model';

export const ACTION_TYPES = {
  FETCH_PROMOCODETRANSACTION_LIST: 'promoCodeTransaction/FETCH_PROMOCODETRANSACTION_LIST',
  FETCH_PROMOCODETRANSACTION: 'promoCodeTransaction/FETCH_PROMOCODETRANSACTION',
  CREATE_PROMOCODETRANSACTION: 'promoCodeTransaction/CREATE_PROMOCODETRANSACTION',
  UPDATE_PROMOCODETRANSACTION: 'promoCodeTransaction/UPDATE_PROMOCODETRANSACTION',
  DELETE_PROMOCODETRANSACTION: 'promoCodeTransaction/DELETE_PROMOCODETRANSACTION',
  RESET: 'promoCodeTransaction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPromoCodeTransaction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PromoCodeTransactionState = Readonly<typeof initialState>;

// Reducer

export default (state: PromoCodeTransactionState = initialState, action): PromoCodeTransactionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROMOCODETRANSACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROMOCODETRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROMOCODETRANSACTION):
    case REQUEST(ACTION_TYPES.UPDATE_PROMOCODETRANSACTION):
    case REQUEST(ACTION_TYPES.DELETE_PROMOCODETRANSACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROMOCODETRANSACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROMOCODETRANSACTION):
    case FAILURE(ACTION_TYPES.CREATE_PROMOCODETRANSACTION):
    case FAILURE(ACTION_TYPES.UPDATE_PROMOCODETRANSACTION):
    case FAILURE(ACTION_TYPES.DELETE_PROMOCODETRANSACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROMOCODETRANSACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROMOCODETRANSACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROMOCODETRANSACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_PROMOCODETRANSACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROMOCODETRANSACTION):
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

const apiUrl = 'api/promo-code-transactions';

// Actions

export const getEntities: ICrudGetAllAction<IPromoCodeTransaction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROMOCODETRANSACTION_LIST,
  payload: axios.get<IPromoCodeTransaction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPromoCodeTransaction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROMOCODETRANSACTION,
    payload: axios.get<IPromoCodeTransaction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPromoCodeTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROMOCODETRANSACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPromoCodeTransaction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROMOCODETRANSACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPromoCodeTransaction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROMOCODETRANSACTION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
