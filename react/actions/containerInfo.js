import axios from 'axios';

// eslint-disable-next-line no-multi-spaces
export const FETCH_CONTAINER_INFO_BEGIN   = 'FETCH_CONTAINER_INFO_BEGIN';
export const FETCH_CONTAINER_INFO_SUCCESS = 'FETCH_CONTAINER_INFO_SUCCESS';
export const FETCH_CONTAINER_INFO_FAILURE = 'FETCH_CONTAINER_INFO_FAILURE';

export const fetchContainerInfoBegin = () => ({
  type: FETCH_CONTAINER_INFO_BEGIN,
});

export const fetchContainerInfoSuccess = data => ({
  type: FETCH_CONTAINER_INFO_SUCCESS,
  payload: typeof data === 'string' ? { content: data } : { data },
});

export const fetchContainerInfoError = error => ({
  type: FETCH_CONTAINER_INFO_FAILURE,
  payload: { error },
});

export function fetchContainerInfo(context, namespace, pod, container, info) {
  return dispatch => {
    dispatch(fetchContainerInfoBegin());
    axios.get(getApiPath(context, namespace, pod, container, info))
      .then(res => dispatch(fetchContainerInfoSuccess(res.data || 'No content!')))
      .catch(error => dispatch(fetchContainerInfoError(error)));
  };
}

export function getApiPath(context, namespace, pod, container, info) {
  return '/api/context/' + context + '/namespace/' + namespace + '/pod/' + pod + '/container/' + container + '/' + info;
}
