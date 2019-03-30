export const SET_LOADING = 'set_loading';

export function setLoading(isLoading) {
    return {
        type: SET_LOADING,
        payload: isLoading,
    };
}


