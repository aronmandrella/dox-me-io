import { useState, useCallback, useRef, useEffect } from "react";

import { IWorldMapMarker } from "@ui";
import {
  fetchClientIpv6,
  fetchUrlGeolocationMetadata,
  fetchMockUrlGeolocationMetadata,
} from "@api";

const IP_STACK_API_KEY = String(process.env.NEXT_PUBLIC_IP_STACK_API_KEY);

export const useMapUrlMarkers = () => {
  /* ---------------------------------- STATE --------------------------------- */

  const [isFakingUrlChecks, setIsFakingUrlChecks] = useState(true);
  const [isCheckingUrl, setIsCheckingUrl] = useState(true);

  const [mapUrlMarkers, setMapUrlMarkers] = useState<IWorldMapMarker[]>([]);

  /*  
    In a complex app probably some kind of shared api error manager would be used.
    It could for example automatically trigger toasts. 
  */
  const [latestUrlCheckError, setLatestUrlCheckError] = useState<{
    title: string;
    message: string;
  } | null>(null);

  /*
    Helper for callbacks that will benefit from staying referentially stable
  */
  const mapUrlMarkersRef = useRef(mapUrlMarkers);
  mapUrlMarkersRef.current = mapUrlMarkers;

  /* -------------------------------- REDUCERS -------------------------------- */

  const clearLatestUrlCheckError = useCallback(() => {
    setLatestUrlCheckError(null);
  }, []);

  const checkUrlAndCreateMapUrlMarker = useCallback(
    async (url: string, label?: string): Promise<void> => {
      setIsCheckingUrl(true);
      setLatestUrlCheckError(null);

      try {
        const fetchFunction = isFakingUrlChecks
          ? fetchMockUrlGeolocationMetadata
          : fetchUrlGeolocationMetadata;

        const ipStack = await fetchFunction({
          url,
          ipStackApiKey: IP_STACK_API_KEY,
        });

        const newCheckedUrl: IWorldMapMarker = {
          key: url,
          label: label || url,
          color: "#15803D",
          city: ipStack.city,
          continent: ipStack.continent_name,
          country: ipStack.country_name,
          lat: ipStack.latitude,
          lon: ipStack.longitude,
        };

        setMapUrlMarkers((checkedUrls) => [...checkedUrls, newCheckedUrl]);
      } catch (e: any) {
        setLatestUrlCheckError({
          title: `Failed to check information about the following url '${url}'`,
          message: String(e?.message),
        });
      }

      setIsCheckingUrl(false);
    },
    [isFakingUrlChecks]
  );

  const checkClientIpAndCreateMapUrlMarker = useCallback(async (): Promise<void> => {
    try {
      const clientIpv6 = await fetchClientIpv6();
      await checkUrlAndCreateMapUrlMarker(clientIpv6, `Your IPv6 - ${clientIpv6}`);
    } catch (e: any) {
      setLatestUrlCheckError({
        title: `Failed to check information about the client ip address.`,
        message: String(e?.message),
      });
    }
  }, [checkUrlAndCreateMapUrlMarker]);

  /* --------------------------------- EFFECTS -------------------------------- */

  /*
    Automatically checks client IP on mount
  */
  useEffect(() => {
    if (!mapUrlMarkers.length) {
      checkClientIpAndCreateMapUrlMarker();
    }
  }, [mapUrlMarkers, checkClientIpAndCreateMapUrlMarker]);

  /* ------------------------------- PUBLIC API ------------------------------- */

  return {
    isFakingUrlChecks,

    isCheckingUrl,
    mapUrlMarkers,
    checkUrlAndCreateMapUrlMarker,

    latestUrlCheckError,
    clearLatestUrlCheckError,

    setIsFakingUrlChecks,
  };
};
