<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Sustainability Apps

[![REUSE Compliance](https://github.com/noi-techpark/webcomp-boilerplate/actions/workflows/reuse.yml/badge.svg)](https://github.com/noi-techpark/odh-docs/wiki/REUSE#badges)
[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-boilerplate)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-boilerplate)
[![CI/CD](https://github.com/noi-techpark/webcomp-boilerplate/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-boilerplate/actions/workflows/main.yml)

A web component displaying statistics for various sustainability apps used in South Tyrol.
Currently, the web component only supports Suedtirol Radelt but Lock.All and Ummadum will be included soon.

- [webcomp-sustainability-apps](#sustainability-apps)
  - [Usage](#usage)
    - [Attributes](#attributes)
      - [Font color](#font-color)
      - [Language](#Language)
      - [Showing sustainability action filter](#showing-sustainability-action-filter)
      - [Selected organisation](#selected-organisation)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Source code](#source-code)
    - [Dependencies](#dependencies)
    - [Build](#build)
  - [Tests and linting](#tests-and-linting)
  - [Deployment](#deployment)
  - [Run with docker](#run-with-docker)
    - [Installation](#installation)
    - [Start the docker containers](#start-the-docker-containers)
    - [Publish a new version of your webcomponent](#publish-a-new-version-of-your-webcomponent)
    - [Stop the docker containers](#stop-the-docker-containers)
    - [Delete your webcomponents from the store](#delete-your-webcomponents-from-the-store)
  - [Information](#information)
    - [Support](#support)
    - [Contributing](#contributing)
    - [Documentation](#documentation)
    - [Boilerplate](#boilerplate)
    - [License](#license)

## Usage

Include the webcompscript file `dist/sustainability-apps.umd.js` in your HTML and define the web component like this:

```html
<sustainability-apps
  fontColor="#000"
  language="en"
  showSustainabilityActionFilter="true"
  showOrganizationFilter="true" />
```

### Attributes

#### Font color

The font color in hex format (e.g. #000000 for black).

Type: string
Default: '#000000'

#### Language

Two letter key for the language to be used.

Type: string
Default: 'en'

#### Showing sustainability action filter

Option whether the sustainability action filter is showing or not.

Type: boolean
Default: true

#### Showing the organization filter

Option whether the organization-filter is showing or not.

Type: boolean
Default: true

#### Selected organisation

Presets the organization-filter with this value.

Type: string
Required: false

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 / NPM 6

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
git clone https://github.com/noi-techpark/webcomp-sustainability-apps.git
```

Change directory:

```bash
cd webcomp-sustainability-apps/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```

The application will be served and can be accessed at [http://localhost:8080](http://localhost:8080).

## Tests and linting

The tests and the linting can be executed with the following commands:

```bash
npm run test
npm run lint
```

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

## Information

### Support

For support, please contact [help@opendatahub.com](mailto:help@opendatahub.com).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.
- Checkout a topic branch from the `main` branch.
- Make sure the tests are passing.
- Create a pull request against the `main` branch.

A more detailed description have a look at our [Getting Started
Guide](https://github.com/noi-techpark/odh-docs/wiki/Contributor-Guidelines:-Getting-started).

### Documentation

More documentation can be found at [https://docs.opendatahub.com](https://docs.opendatahub.com).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.

### REUSE

This project is [REUSE](https://reuse.software) compliant, more information about the usage of REUSE in NOI Techpark repositories can be found [here](https://github.com/noi-techpark/odh-docs/wiki/Guidelines-for-developers-and-licenses#guidelines-for-contributors-and-new-developers).

Since the CI for this project checks for REUSE compliance you might find it useful to use a pre-commit hook checking for REUSE compliance locally. The [pre-commit-config](.pre-commit-config.yaml) file in the repository root is already configured to check for REUSE compliance with help of the [pre-commit](https://pre-commit.com) tool.

Install the tool by running:

```bash
pip install pre-commit
```

Then install the pre-commit hook via the config file by running:

```bash
pre-commit install
```
