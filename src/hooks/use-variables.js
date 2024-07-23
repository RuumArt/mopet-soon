import { useMemo } from 'react';

const useVariables = (data, deps = []) => {
	return useMemo(() => ({ ...data }), deps); // eslint-disable-line
};

export default useVariables;
