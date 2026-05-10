# Project Guidelines

## Code Style
- This project is Angular 13 + JHipster gateway frontend code.
- Follow `.editorconfig` indentation rules:
  - 2 spaces for `ts/js/json/yml/html/css/scss` files.
  - 4 spaces for Markdown files.
- Follow ESLint and selector conventions from `.eslintrc.json`:
  - Component selector prefix: `jhi` with kebab-case.
  - Directive selector prefix: `jhi` with camelCase.
- Use Prettier for formatting:
  - `npm run prettier:check`
  - `npm run prettier:format`

## Architecture
- Source root is `src/main/webapp` (configured in `angular.json`).
- Keep responsibilities separated by existing folders under `src/main/webapp/app`:
  - `core`: authentication, interceptors, app config, low-level utilities.
  - `shared`: reusable UI helpers, pipes, shared module pieces.
  - `entities`: entity modules/services/models and CRUD UI.
  - `layouts`: shell/layout components.
  - `home`, `admin`, `account`, `login`, `widgets`: feature areas.
- Keep route-level boundaries in `app-routing.module.ts` using lazy-loaded modules.
- Build API URLs through `ApplicationConfigService.getEndpointFor(...)` instead of hardcoding service paths.

## Build And Test
- Install dependencies: `npm install`
- Development server: `npm start`
- Production web build: `npm run webapp:prod`
- Lint: `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Unit tests: `npm test` (Angular/Jest pipeline as configured)
- Cypress E2E: `npm run e2e` or `npm run e2e:cypress`

## Conventions
- Prefer existing npm scripts in `package.json` over ad-hoc commands.
- Use RxJS/Observable patterns already used in services and auth state management.
- Keep entity patterns consistent:
  - model interface + class + identifier helper.
  - service CRUD methods with typed `HttpResponse` aliases.
- Preserve existing date handling conventions in entity services when modifying request/response mapping.

## Environment Prerequisites
- Node.js version must satisfy `>=16.14.0` (`package.json` engines).
- Local dev API traffic is proxied by `webpack/proxy.conf.js`; verify target/backends before debugging API issues.
- E2E tests expect an accessible backend/auth endpoint; start required backend services first.

## Key References
- `README.md` for developer workflows and testing setup.
- `package.json` for canonical scripts.
- `angular.json` for build/source-root configuration.
- `src/main/webapp/app/app-routing.module.ts` for route/module boundaries.
- `src/main/webapp/app/core/config/application-config.service.ts` for API endpoint conventions.
