# Softix Admin Dashboard — Cypress E2E Suite

End-to-end coverage for the `/system` admin dashboard on
`https://pgstage.softix.shop`, built from the rendered dashboard markup.

## What's covered

| Spec file | Covers |
|---|---|
| `01-navigation.cy.js` | Page load, breadcrumb, sidebar active state, footer, sidebar collapse/expand, mobile drawer, refresh button |
| `02-search.cy.js` | Universal search (module select, empty-term validation toast + auto-dismiss + manual close, per-module redirect, "View Products" shortcut) |
| `03-metrics-cards.cy.js` | Orders / Customers / Products / Vendors cards, their sparkline charts, dropdown filters, Cart & Wishlist panels |
| `04-charts-filters.cy.js` | Sales Analytics, Top Selling Categories (incl. slice click/reset), Revenue Overview, Payment Methods — all with their filter dropdowns |
| `05-tables.cy.js` | Top Selling Product (+ row/chart interaction), Order Status Overview, Refund Overview, Top Vendors, Expiring Products, Expiring Vendors, Recent Orders |
| `06-province-drilldown.cy.js` | Province table/chart, percentage math, province → district drill-down, back button, date filter |
| `07-notifications-theme-usermenu.cy.js` | Notification bell polling & badge, light/dark/system theme switch + persistence, user menu contents, sign-out flow |
| `08-sidebar-menu.cy.js` | Every accordion section and direct link in the sidebar, data-driven against the actual `href`s in the markup |

## Before you run this

**Authentication is not fully wired up.** The page we tested against is
already an authenticated session (it renders "Super Admin" / a real
avatar), but the login form itself wasn't part of the markup we had, so
`cypress/support/commands.js` → `loginAsAdmin()` is a best-effort stub:

```js
cy.visit(Cypress.env('LOGIN_PATH'));
cy.get('input[name="email"], input[type="email"]').first().type(email);
cy.get('input[name="password"], input[type="password"]').first().type(password);
cy.get('button[type="submit"], input[type="submit"]').first().click();
```

Before running the suite:

1. Open the real login page and confirm the field selectors/route in
   `cypress.config.js` (`LOGIN_PATH`) and `commands.js` match reality.
2. Set real credentials, either in `cypress.config.js` → `env`, or (safer)
   via environment variables so nothing sensitive is committed:

   ```bash
   CYPRESS_ADMIN_EMAIL="you@example.com" \
   CYPRESS_ADMIN_PASSWORD="********" \
   npx cypress run
   ```

3. If the app uses a different session marker than the `XSRF-TOKEN`
   cookie assumed in `cy.session()`'s `validate()` callback, swap it for
   whatever cookie/localStorage key actually indicates "logged in".

## Install & run

```bash
npm install
npx cypress open      # interactive runner
# or
npm run cy:run        # headless, all specs
npm run cy:run:dashboard
```

## Notes on the endpoints being tested against

The dashboard fires a lot of its own AJAX on load and on filter change.
Specs use `cy.intercept()` + `cy.wait()` against these real endpoints
(no stubbing/mocking — this is a true E2E run against staging):

- `GET /system/dashboard/metrics`, `/metrics/today`, `/metrics/:filter`
- `GET /system/dashboard/notifications`
- `GET /system/dashboard/top-categories`, `/top-categories/:filter`
- `GET /system/dashboard/top-products`
- `GET /system/dashboard/order-status`
- `GET /system/dashboard/refund-overview`
- `GET /system/dashboard/top-vendors`
- `GET /system/dashboard/expiring-products`, `/expiring-vendors`
- `GET /system/dashboard/recent-orders`
- `GET /system/dashboard/province-data`
- `GET /system/dashboard/sales-analytics/:filter`
- `GET /system/dashboard/payment-methods`

Because this hits live staging data, a few assertions are intentionally
loose (e.g. "table has at least one row", "percentages sum to ~100")
rather than pinned to exact seed values, so the suite doesn't become
flaky as the underlying data changes.

## Known gaps / follow-ups

- Per-row action-menu dropdowns (the `table .menu.menu-sub` positioning
  script at the bottom of the page) aren't covered yet — worth a spec
  once you confirm which tables actually expose row actions.
- The staged users-search and invite-friends modals in the page are
  currently static/dead markup (no visible trigger), so they're
  intentionally left untested.
- Add `data-testid` attributes to the app where selectors currently
  fall back to text content or Bootstrap-generated classes — that'll
  make several specs (especially the sidebar one) less brittle to
  copy changes.