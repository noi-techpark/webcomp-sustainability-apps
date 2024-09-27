import { suedtirolRadeltApiClient } from '@/api/base';

export interface SuedtirolRadeltItem {
  tname: string;
  ttype: string;
  tunit: string;
  mvalue: number;
  sname: string;
  stype: string;
}

interface ApiResponse {
  offset: number;
  data: SuedtirolRadeltItem[];
}

function parseResponse(data: SuedtirolRadeltItem[]): SuedtirolRadeltItem[] {
  return data.map((item: SuedtirolRadeltItem) => ({
    tname: item.tname,
    ttype: item.ttype,
    tunit: item.tunit,
    mvalue: item.mvalue,
    sname: item.sname,
    stype: item.stype,
  }));
}

export const fetchCompanyGamificationActions = async (): Promise<
  SuedtirolRadeltItem[]
> => {
  const response = await suedtirolRadeltApiClient.get<ApiResponse>(
    '/flat,node/CompanyGamificationAction/*/latest?where=sactive.eq.true&limit=-1'
  );
  return parseResponse(response.data.data);
};
