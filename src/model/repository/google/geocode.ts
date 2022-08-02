import axios from 'axios';
import { useCallback } from 'react';
import { GEOCODE_ENDPOINT } from '~/constants/constants';

export const useFetchGeocode = () => {
  return useCallback(async (address: string) => {
    const results = await axios.get(GEOCODE_ENDPOINT, {
      params: {
        address,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
        region: 'JP',
        language: 'ja',
      },
    });
    return results;
  }, []);
};
