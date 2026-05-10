---
mode: "agent"
description: "Generate an Angular entity feature slice: model, service, module, routing, list component, and all specs."
---

# Add Angular UI Feature Slice

Generate a complete Angular entity feature slice conforming to the patterns in this project.

## Inputs

Fill in the variables below before running:

| Variable          | Description                                          | Example              |
|-------------------|------------------------------------------------------|----------------------|
| `ENTITY_NAME`     | PascalCase entity name                               | `FaqCategory`        |
| `ENTITY_KEBAB`    | kebab-case entity name (used in routes and filenames)| `faq-category`       |
| `ENTITY_CAMEL`    | camelCase entity name (used in variables)            | `faqCategory`        |
| `MICROSERVICE`    | Lowercase registry name passed to `getEndpointFor`   | `generalservice`     |
| `API_PATH`        | REST path segment, plural kebab                      | `api/faq-categories` |
| `FIELDS`          | Comma-separated `fieldName:TypeScript type` pairs    | `question:string, answer:string, language:LanguageType` |
| `HAS_DATES`       | `true` if any field is `dayjs.Dayjs`, else `false`   | `false`              |

## Pre-flight Checks

Before generating any file, verify:

- [ ] `src/main/webapp/app/entities/<ENTITY_KEBAB>/` directory does not already exist (to avoid overwriting).
- [ ] Entity module will be referenced in `app-routing.module.ts` with a lazy-loaded route.
- [ ] All imports use path alias `app/...` (never relative `../../...` for cross-folder imports).
- [ ] `ApplicationConfigService.getEndpointFor(API_PATH, MICROSERVICE)` is used for the resource URL.

## Files to Generate (in order)

### 1. Model — `src/main/webapp/app/entities/<ENTITY_KEBAB>/<ENTITY_KEBAB>.model.ts`

- Export `interface I<ENTITY_NAME>` with all `FIELDS` as optional (`?`) properties.
- Export `class <ENTITY_NAME> implements I<ENTITY_NAME>` with constructor matching the interface.
  - Default all fields to optional/nullable (`field?: type | null`).
- Export `function get<ENTITY_NAME>Identifier(entity: I<ENTITY_NAME>): string | undefined` returning `entity.id`.
- If `HAS_DATES` is true, import `dayjs` from `'dayjs/esm'`.

### 2. Service — `src/main/webapp/app/entities/<ENTITY_KEBAB>/service/<ENTITY_KEBAB>.service.ts`

Follow [frontend-services.instructions.md](.github/instructions/frontend-services.instructions.md). Key requirements:
- `EntityResponseType` and `EntityArrayResponseType` type aliases (exported).
- `resourceUrl` and `resourceSearchUrl` via `getEndpointFor`.
- All 7 CRUD + search methods returning Observables.
- `add<ENTITY_NAME>ToCollectionIfMissing` deduplication helper.
- `convertDateFromClient`/`convertDateFromServer` only when `HAS_DATES` is true.

### 3. Module — `src/main/webapp/app/entities/<ENTITY_KEBAB>/<ENTITY_KEBAB>.module.ts`

```typescript
@NgModule({
  imports: [SharedModule, <ENTITY_NAME>RoutingModule],
  declarations: [<ENTITY_NAME>Component],
})
export class <MICROSERVICE_PASCAL><ENTITY_NAME>Module {}
```

`<MICROSERVICE_PASCAL>` is the PascalCase microservice name prefix (e.g., `GeneralService`).

### 4. Routing module — `src/main/webapp/app/entities/<ENTITY_KEBAB>/route/<ENTITY_KEBAB>-routing.module.ts`

- Route `''` → list component (no auth guard for read-only lists; add `hasAnyAuthority` guard for mutating routes if SECURED).
- Route `':id/view'` → detail component (if generated).
- Route `':id'` handled by `<ENTITY_NAME>RoutingResolveService`.

### 5. Routing resolver — `src/main/webapp/app/entities/<ENTITY_KEBAB>/route/<ENTITY_KEBAB>-routing-resolve.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class <ENTITY_NAME>RoutingResolveService implements Resolve<I<ENTITY_NAME>> {
  resolve(route: ActivatedRouteSnapshot): Observable<I<ENTITY_NAME>> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entity: HttpResponse<I<ENTITY_NAME>>) => {
          if (entity.body) return of(entity.body);
          this.router.navigate(['404']);
          return EMPTY;
        })
      );
    }
    return of(new <ENTITY_NAME>());
  }
}
```

### 6. List component — `src/main/webapp/app/entities/<ENTITY_KEBAB>/list/<ENTITY_KEBAB>.component.ts`

- Selector: `jhi-<ENTITY_KEBAB>`.
- Injects `<ENTITY_NAME>Service` and `ActivatedRoute`.
- Implements `ngOnInit()` calling `this.load()` / `this.loadAll()`.
- Uses `query()` from the service returning an Observable, subscribing to set `this.<ENTITY_CAMEL>s`.

### 7. List component template — `src/main/webapp/app/entities/<ENTITY_KEBAB>/list/<ENTITY_KEBAB>.component.html`

Minimal table or card list using `*ngFor="let item of <ENTITY_CAMEL>s"` with `jhiTranslate` attribute on column headers.

### 8. Service spec — `src/main/webapp/app/entities/<ENTITY_KEBAB>/service/<ENTITY_KEBAB>.service.spec.ts`

Follow [frontend-tests.instructions.md](.github/instructions/frontend-tests.instructions.md). Cover:
- `find`, `create`, `update`, `partialUpdate`, `delete`, `query`, `search`.
- Date conversion round-trips if `HAS_DATES` is true.
- `addToCollectionIfMissing` with at least two cases (item already present, item new).

### 9. List component spec — `src/main/webapp/app/entities/<ENTITY_KEBAB>/list/<ENTITY_KEBAB>.component.spec.ts`

Follow [frontend-tests.instructions.md](.github/instructions/frontend-tests.instructions.md). Use `overrideTemplate`. Cover `ngOnInit` loads data.

### 10. Routing resolve spec — `src/main/webapp/app/entities/<ENTITY_KEBAB>/route/<ENTITY_KEBAB>-routing-resolve.service.spec.ts`

Three cases: entity found, new entity (no id), 404 navigation.

## Post-generation Checklist

- [ ] Add the lazy-loaded route to `src/main/webapp/app/app-routing.module.ts`:
  ```typescript
  {
    path: '<ENTITY_KEBAB>',
    loadChildren: () => import('./entities/<ENTITY_KEBAB>/<ENTITY_KEBAB>.module').then(m => m.<MICROSERVICE_PASCAL><ENTITY_NAME>Module),
  }
  ```
- [ ] Run `npm run lint` — fix any selector prefix or import issues before committing.
- [ ] Run `npm test -- --testPathPattern <ENTITY_KEBAB>` to verify all generated specs pass.
- [ ] Run `npm run prettier:format` on all generated files.
