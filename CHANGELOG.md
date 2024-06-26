# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/julienvanroy/naufrages-server/compare/v1.1.0...v1.2.0) (2022-05-25)


### Features

* add npm run dev ([1205f27](https://github.com/julienvanroy/naufrages-server/commit/1205f27492bad6abd819910d65f765badd6a8b0a))
* add pseudo ([b08702f](https://github.com/julienvanroy/naufrages-server/commit/b08702fd0eda118ecfaed4cda0b56dbb767d073a))
* refacto state & add leave players and reconnection ([6976d80](https://github.com/julienvanroy/naufrages-server/commit/6976d80ee80884666655edc0df23048c972d24ea))
* teg getPlayr, getAllPlayers ([3b4be03](https://github.com/julienvanroy/naufrages-server/commit/3b4be031b3f10f4c0257e4360d62ee8f37c45d03))
* tej getAllPlayer, delegate playertarget to state ([48f2dae](https://github.com/julienvanroy/naufrages-server/commit/48f2dae27681c3d6fc3144bb9030122d32eea853))


### Bug Fixes

* delete broadcast addPoint, delegate listen for Points changes to colyseus room state ([95e0ac1](https://github.com/julienvanroy/naufrages-server/commit/95e0ac180429575cd21490789d2b925b99a65220))
* maxClientPerRoom is 8 mobile and 1 desktop ([55e2b84](https://github.com/julienvanroy/naufrages-server/commit/55e2b842b4f8dd1cb4470a441a82c22b2abfac5a))
* remettre getPlayer, getAllPlayers ([2642b66](https://github.com/julienvanroy/naufrages-server/commit/2642b668dfbad8a136a1debf72a816107fb718f3))

### [1.1.0](https://github.com/julienvanroy/naufrages-server/compare/v1.0.0...v1.1.0) (2022-05-17)


### Features

* add color to player ([9444b70](https://github.com/julienvanroy/naufrages-server/commit/9444b70de5d278930ca21fed27fee8e1d062f1e7))
* add getPlayer ([828365b](https://github.com/julienvanroy/naufrages-server/commit/828365b1313a679131414a5108e564eef5d7d36c))
* add id to player ([48ad0d5](https://github.com/julienvanroy/naufrages-server/commit/48ad0d5da877eea0c6962aa3a0ad13053f0e015a))
* add interface ([59fa962](https://github.com/julienvanroy/naufrages-server/commit/59fa9620a75d30ddf2d8a8568d690f5183cbfc47))
* add on message update player target ([732ccde](https://github.com/julienvanroy/naufrages-server/commit/732ccde9f0186536649fe9f898114666a8b1e814))
* add points for player ([612b97a](https://github.com/julienvanroy/naufrages-server/commit/612b97af02ab59aea6b1b2480b1c725eac60b6a4))
* add waiting for gamepad ([87c0674](https://github.com/julienvanroy/naufrages-server/commit/87c067405397324b3948863177cbd100b263f3f1))
* broacast addpoint ([df91cc7](https://github.com/julienvanroy/naufrages-server/commit/df91cc728e20c691eb91ea3cdecec0cd49394a3e))
* config Play room (setup autoDispose, maxClients ([9ddf646](https://github.com/julienvanroy/naufrages-server/commit/9ddf646e27d615a0d463e95e04adcd6a46212d05))
* create lobby room ([2dbf192](https://github.com/julienvanroy/naufrages-server/commit/2dbf19239d90eb361858861e8bcaa0e19899579b))
* create some plublic rooms at the start ([0dfacef](https://github.com/julienvanroy/naufrages-server/commit/0dfacef336ed30d0e5cc88160c28619060ef0665))
* delete starter rooms ([d3f15e1](https://github.com/julienvanroy/naufrages-server/commit/d3f15e131c826040a291ac9b682fdf8352486e27))
* get and send players datas to client ([0eedbbb](https://github.com/julienvanroy/naufrages-server/commit/0eedbbbaff090346a2a1715763ae3f377779da2d))
* get datas from client and redistribute ([d84cbd5](https://github.com/julienvanroy/naufrages-server/commit/d84cbd539d66729b7a0ef27d4601b821072e10ad))
* get datas from client and redistribute (kill, power) ([fad9323](https://github.com/julienvanroy/naufrages-server/commit/fad9323d18b045e58c152749abd05ecb4a9b796e))
* pop player on main screen when manette join room ([70ec5bb](https://github.com/julienvanroy/naufrages-server/commit/70ec5bb65b2fd91998918c03a8b1f9d1cf89b34a))

## 1.0.0 (2022-04-29)


### Features

* init project / commit lint / conventional-commit ([4253ddd](https://github.com/julienvanroy/naufrages-server/commit/4253dddb87431d29b515f40792a2889b71f77573))
