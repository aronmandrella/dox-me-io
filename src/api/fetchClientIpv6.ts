import { assert, object, string } from "superstruct";

/* --------------------------------- SCHEMAS -------------------------------- */

const IpifyResponseSchema = object({
  ip: string(),
});

/* ------------------------------ API FUNCTION ------------------------------ */

export const fetchClientIpv6 = async (): Promise<string> => {
  const response = await fetch("https://api64.ipify.org?format=json");
  const data = await response.json();

  // Throws data if doesn't match schema
  assert(data, IpifyResponseSchema);

  const ipv6 = data.ip;

  return ipv6;
};
