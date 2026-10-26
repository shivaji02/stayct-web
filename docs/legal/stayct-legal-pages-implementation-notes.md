# stayct legal pages — audit and implementation notes

**Date: 14 September 2026**
Nothing has been deployed. No repository was available in this session, so these are drop-in replacements for your developer to apply.

---

## 1. Audit of the three live pages

### https://stayct.in/privacy — REPLACE

| Item | Current | Problem |
|---|---|---|
| Meta title | `Privacy \| STAYCT` | Wrong brand case |
| Meta description | "Review how STAYCT handles enquiries, contact details, and website data." | Wrong case; website-only scope |
| Page heading | "Privacy details should stay readable, not hidden behind placeholders." | Editorial placeholder, not a legal heading |
| Sections | 3: what stayct collects, why, how long | No app scope, no Firebase, no location, no photos, no resident data, no rent records, no WhatsApp, no deletion, no rights, no security, no children, no contact block |
| Footer | `© 2026 STAYCT · stayct.in` | Wrong brand case |

Only the enquiry-form data is described: name, phone, email, city, stay context. Everything the mobile app does is absent. This page cannot support an App Privacy declaration in its current form.

### https://stayct.in/terms — REPLACE

| Item | Current | Problem |
|---|---|---|
| Meta title | `Terms \| STAYCT` | Wrong case; should be "Terms of Service" |
| Meta description | "Review the terms that apply to STAYCT website usage and accommodation enquiries." | Wrong case; website-only scope |
| Page heading | "Terms should clarify expectations without becoming another dead end." | Editorial placeholder |
| Sections | 3: website usage, listing information, responsible use | No accounts, no operator duties, no resident data basis, no rent/deposit position, no user content, **no content licence**, no IP, no liability, no governing law |
| Brand | "STAYCT" × 12 | Wrong case throughout |

The missing user-content licence is what currently blocks the Apple Content Rights declaration.

### https://stayct.in/support — KEEP, two small fixes

Verified correct and publicly accessible:

- support@stayct.in ✓
- +91 91363 37031 ✓
- FAQ, contact options, troubleshooting, getting started ✓
- Links to Privacy ✓ and Terms ✓

Two changes only:

1. **Brand case.** Meta title `Support | stayct`, meta description "Get help from stayct with FAQs, troubleshooting, phone support, and email support." and all in-body occurrences of STAYCT → stayct.
2. **Link labels.** Footer currently says "Privacy" and "Terms". Change to "Privacy Policy" and "Terms of Service" to match the new page titles.

No content rewrite needed.

---

## 2. Branding — this is a sitewide change, not a three-page one

The brand renders as **STAYCT** everywhere on the site: navigation, every meta title, every meta description, page bodies, and the footer copyright on all pages. Changing only /privacy and /terms will leave the site visibly inconsistent.

Recommended sweep, in this order:

1. Find where the site name is defined once — a `siteConfig`, layout constant, or metadata template. Most Next.js sites set the title template (`%s | STAYCT`) and footer in one or two files.
2. Change it there to `stayct`.
3. Then grep the whole repo for user-visible occurrences:

```
grep -rn --include='*.{ts,tsx,js,jsx,mdx,md,json,html}' -E 'StayCT|STAYCT|stayCT|Stayct' .
```

4. Leave code identifiers alone — component names, CSS classes, env var names, database tables, the `com.stayct.app` bundle ID and the `stayct-ios-001` SKU are not user-visible and do not need renaming.
5. Do not touch the domain: `stayct.in` stays as it is.

The App Store Connect app name is already lowercase `stayct`, so the store listing and the site will match once this is done.

---

## 3. Metadata to set

```
/privacy
  title:       Privacy Policy | stayct
  description: How stayct collects, uses and protects information across our website and applications.

/terms
  title:       Terms of Service | stayct
  description: Terms governing your use of the stayct platform and services.

/support
  title:       Support | stayct
  description: Get help from stayct with FAQs, troubleshooting, phone support, and email support.
```

Both new pages carry a visible **Last updated: 14 September 2026**. Wire that to a real constant so it is easy to bump, and do not backdate it.

---

## 4. What the copy is based on

Every factual claim traces to something confirmed, not assumed.

**Confirmed and therefore stated:**

| Claim | Source |
|---|---|
| Owner/operator is the account holder; residents are records, not account holders | You, product correction |
| Owner/operator can delete their own stayct account in-app | You, product correction |
| Marking a resident vacated ends the stay, and is not account deletion | You, product correction |
| Historical stay, rent, deposit, expense and complaint records may persist after vacancy | You, product correction |
| Phone + PIN authentication, no email/password | You, this session |
| Firebase Analytics and Crashlytics in the build | You, this session |
| Coarse location only, no precise GPS | You, this session |
| Resident records hold phone number | You, this session |
| In-app account deletion exists and deletes server-side | You, this session |
| No in-app user-to-user messaging | You, this session |
| Records scoped to one operator, not visible across operators | You, this session |
| No in-app purchases or digital subscriptions | App Store Connect: no IAP products, no subscription groups |
| Camera and photo library used for property and complaint images | Build's TestFlight "What to Test" note |
| WhatsApp Business Platform used for notifications | Your integration records |
| Website enquiry fields: name, phone, email, city, stay context | Current live /privacy page |
| support@stayct.in and +91 91363 37031 | Current live /support page |

**Deliberately not claimed, because unverified:**

- **Push notification tokens.** You listed crash reporting and analytics, not push. If Firebase Cloud Messaging is in the build, add "push notification identifiers" to Privacy Section 3 and a Notifications entry to Section 4.
- **Email collection in the app.** The website enquiry form collects email; the app does not, on your description. If any operator or resident record has an email field, add it to Privacy Section 2.
- **Name fields.** You said residents are stored by phone number only. If a resident or operator record has a name field, add it.
- **ID documents.** Not mentioned. If operators can upload Aadhaar, PAN or passport images against a resident, that is sensitive information and needs its own treatment in both the policy and the App Privacy declaration.
- **Payment processor.** Written on the basis that stayct records payments but does not move money. Flagged inline in both documents.
- **Specific retention periods.** No day or month counts invented. Flagged inline.
- **Legal entity and jurisdiction.** Terms Section 20 is deliberately left incomplete.

---

## 4a. Account model — the correction that shaped these documents

The two concepts are kept strictly apart in both documents:

| | Owner/operator | Resident |
|---|---|---|
| Holds a stayct account | Yes | No |
| Signs in | Yes, phone + PIN | No |
| Exists as | Account holder | A record maintained by an owner/operator |
| Can delete a stayct account | Yes, in-app | Not applicable, there is no account to delete |
| "Vacate" means | n/a | Their occupancy or stay has ended |
| Effect of vacating | None on the account | Stay ends; historical records may remain |

Where this landed in the copy:

- Privacy §1 defines both concepts before anything else is said.
- Privacy §11 is now three parts: deleting your stayct account, marking a resident as vacated, and a section addressed to residents explaining there is no resident account to delete.
- Privacy §10 notes that ending a stay does not automatically remove the record.
- Terms §2 restricts accounts to owner/operators and states plainly that creating a resident record does not create an account.
- Terms §4 adds that ending a stay is not the same as deleting a record, and that removing resident information is a separate step the operator must take.
- Terms §16 is split into account deletion and resident vacancy.

Neither document describes residents as independent stayct users anywhere.

**Apple relevance.** Guideline 5.1.1(v) attaches to the account that a person creates in the app. That is the owner/operator account, and it has an in-app delete function. Resident records are third-party data held by an operator, not accounts, so residents persisting after vacancy is not an account-deletion failure. Status is now **functionally supported, end-to-end verification still recommended** rather than a blocker.

---

## 5. Three things blocking publication

1. **Governing law and legal entity** (Terms §20). Need the operating entity's registered name and address, and the state and courts with jurisdiction. Your GST registration is still unresolved, so the entity may not be settled yet. This is the only section written as a hard stop.
2. **Liability cap** (Terms §18). Left open on purpose. A lawyer should set the figure.
3. **Payment position** (Privacy §6, Terms §6). Both say stayct records but does not collect money. Confirm that is true today.

Items 2 and 3 can be resolved by you. Item 1 needs the entity settled.

Account deletion is **not** on this list. It is documented and functionally supported for the owner/operator account. One manual end-to-end check before submission is still worth doing: sign in on build 1.0 (1), delete the account, and confirm the backend actually runs the deletion workflow rather than only clearing local state or flagging the row inactive.

---

## 6. Brand check on the delivered copy

```
stayct-privacy-policy.md        StayCT:0  STAYCT:0  stayCT:0  Stayct:0   stayct:59
stayct-terms-of-service.md      StayCT:0  STAYCT:0  stayCT:0  Stayct:0   stayct:77
stayct-app-privacy-answers.md   StayCT:0  STAYCT:0  stayCT:0  Stayct:0   stayct:5
```

Zero incorrect occurrences in the page copy. Sentences were rewritten where needed so the lowercase brand never starts a sentence awkwardly.

This notes file deliberately contains `STAYCT` in a few places: the audit tables quoting the current live pages, the grep pattern in Section 2, and the verification output above. Those are quotations of what is wrong, not new copy.
