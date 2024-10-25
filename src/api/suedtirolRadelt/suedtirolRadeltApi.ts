// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { openDataHubApiClient } from '@/api/openDataHubApiClient';
import { SuedtirolRadeltItem } from '@/api/suedtirolRadelt/suedtirolRadeltItem.model';
import { OpenDataHubApiResponse } from '@/api/openDataHubApiResponse.model';
import { Company } from '@/api/suedtirolRadelt/company.model';
import { HistoricSuedtirolRadeltItem } from './historicSuedtirolRadeltItem.model';

const requestedDataTypes = [
  'km_total',
  'co2',
  'money_saved',
  'number_of_people',
];

const companyGamificationEndpoint = 'CompanyGamificationAction';
const origin = 'webcomp-sustainability-apps';

export async function fetchCompaniesAsync(): Promise<Set<string>> {
  const select = ['sname'];
  const where = 'sactive.eq.true';
  const response = await openDataHubApiClient.get<
    OpenDataHubApiResponse<Company>
  >(
    `/flat/${companyGamificationEndpoint}/${requestedDataTypes.join(',')}/latest?origin=${origin}&where=${where}&limit=-1&distinct=true&select=${select.join(',')}`
  );
  return new Set(
    response.data.data.map((item: Company) => item.sname.split('-')[0])
  );
}

export async function fetchCompanyGamificationActionsAsync(): Promise<
  SuedtirolRadeltItem[]
> {
  const select = ['tname', 'ttype', 'tunit', 'mvalue', 'sname', 'stype'];
  const where = 'sactive.eq.true';
  const response = await openDataHubApiClient.get<
    OpenDataHubApiResponse<SuedtirolRadeltItem>
  >(
    `/flat/${companyGamificationEndpoint}/${requestedDataTypes.join(',')}/latest?origin=${origin}&where=${where}&limit=-1&select=${select.join(',')}`
  );
  return response.data.data.map((item: SuedtirolRadeltItem) => ({
    tname: item.tname,
    ttype: item.ttype,
    tunit: item.tunit,
    mvalue: item.mvalue,
    sname: item.sname,
    stype: item.stype,
  }));
}

export async function fetchHistoricDataAsync(
  from: Date,
  to: Date,
  company?: string
): Promise<SuedtirolRadeltItem[]> {
  const upperIntervalLimit = new Date(from);
  upperIntervalLimit.setDate(from.getDate() + 5);

  if (from > to || to > upperIntervalLimit) {
    throw new Error(
      'Invalid date range: from must be before to and the range must not exceed 5 days.'
    );
  }

  const select = ['tname', 'ttype', 'tunit', 'mvalue', 'sname', 'stype'];
  const where = company
    ? `and(sactive.eq.true,sname.eq.${company})`
    : 'sactive.eq.true';

  const response = await openDataHubApiClient.get<
    OpenDataHubApiResponse<HistoricSuedtirolRadeltItem>
  >(
    `/flat/${companyGamificationEndpoint}/${requestedDataTypes.join(',')}/${from.toISOString()}/${to.toISOString()}/?origin=${origin}&where=${where}&select=${select}&limit=-1`
  );
  return response.data.data.map((item: HistoricSuedtirolRadeltItem) => ({
    tname: item.tname,
    ttype: item.ttype,
    tunit: item.tunit,
    mvalue: item.mvalue,
    sname: item.sname,
    stype: item.stype,
  }));
}
