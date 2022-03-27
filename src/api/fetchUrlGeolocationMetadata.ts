import { create, assert, type, object, number, string, boolean, Infer } from "superstruct";

/* --------------------------------- SCHEMAS -------------------------------- */

const IpStackErrorResponseSchema = object({
  success: boolean(),
  error: type({
    info: string(),
  }),
});

const IpStackSuccessResponseSchema = type({
  ip: string(),
  continent_name: string(),
  country_name: string(),
  city: string(),
  latitude: number(),
  longitude: number(),
});

/* ------------------------------ API FUNCTION ------------------------------ */

export type IFetchIpStackResult = Infer<typeof IpStackSuccessResponseSchema>;

interface IFetchUrlGeolocationMetadata {
  url: string;
  ipStackApiKey: string;
}

export const fetchUrlGeolocationMetadata = async (
  params: IFetchUrlGeolocationMetadata
): Promise<IFetchIpStackResult> => {
  const { url, ipStackApiKey } = params;

  const response = await fetch(`http://api.ipstack.com/${url}?access_key=${ipStackApiKey}`);
  const data = await response.json();

  if (data.success === false) {
    // Throws if data doesn't match schema
    assert(data, IpStackErrorResponseSchema);

    throw new Error(data.error.info);
  } else {
    // Throws if data doesn't match schema
    const validatedData = create(data, IpStackSuccessResponseSchema);

    return validatedData;
  }
};

/* ---------------------- MOCK VERSION OF API FUNCTION ---------------------- */

/*
  For testing and for future, or in case API key expires.
*/
export const fetchMockUrlGeolocationMetadata = async (
  params: IFetchUrlGeolocationMetadata
): Promise<IFetchIpStackResult> => {
  return {
    ip: "127.0.0.1",
    continent_name: "Neverland",
    country_name: "Lorem",
    city: "Ipsum",
    latitude: 0 + Math.random() * 100 - 50,
    longitude: 0 + Math.random() * 100 - 50,
  };
};
