// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { SuedtirolRadeltItem } from './suedtirolRadeltItem.model';

export interface HistoricSuedtirolRadeltItem extends SuedtirolRadeltItem {
  timeStamp: Date;
}
