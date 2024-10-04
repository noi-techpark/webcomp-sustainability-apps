// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import axios from 'axios';

export const suedtirolRadeltApiClient = axios.create({
  baseURL: 'https://mobility.api.opendatahub.testingmachine.eu/v2', // Replace with your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
