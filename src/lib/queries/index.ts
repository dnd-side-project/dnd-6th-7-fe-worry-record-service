import {
  UseQueryOptions,
  useQuery,
  UseQueryResult,
  UseMutationResult,
  useMutation,
} from 'react-query';

export function useCustomQuery(
  key: any,
  api: any,
  options?: UseQueryOptions,
): UseQueryResult {
  const queryInfo = useQuery(key, () => api, {
    ...options,
    refetchOnWindowFocus: false,
    suspense: true,
    structuralSharing: false,
    notifyOnChangeProps: 'tracked',
  });

  return queryInfo;
}

export function useCustomMutation(
  api: any,
  onSuccessCb: (data: any) => void,
  onErrorCb: (data: any) => void,
  options?: any,
): UseMutationResult {
  return useMutation((arg: any) => api(arg), {
    ...options,
    onSuccess: (result: any) => {
      onSuccessCb(result);
    },
    onError(error: any) {
      onErrorCb(error);
    },
  });
}
