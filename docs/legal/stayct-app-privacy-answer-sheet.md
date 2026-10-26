# stayct — Apple App Privacy answer sheet

Proposed answers for App Store Connect → App Privacy → Get Started.
Derived from: Firebase Analytics + Crashlytics confirmed in build, phone + PIN auth, coarse location, resident phone numbers, rent/deposit/expense records, property and complaint photos, no advertising SDKs.

> **Account model note.** Residents do not hold stayct accounts. That changes nothing here. Apple's App Privacy asks what data the app **collects and processes**, not whose account it belongs to. Resident phone numbers, stay records, rent and deposit entries and complaint content are all collected by the app and must be declared, even though residents never sign in. Do not narrow any answer on the grounds that residents are not users.
>
> "Linked to the user" also stays **Yes** for resident data: it is linked to an identified person's record inside an identified operator's account.

**Tracking question (asked first): NO.** stayct does not track users across apps and websites owned by other companies, does not share data with data brokers, and runs no advertising SDKs. Answer "No" to tracking for every data type below.

---

## Data types to select

### 1. Contact Info → Phone Number
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **App Functionality**
- Why: two separate things, both declarable here. The owner/operator's phone number is the sign-in identifier. Resident phone numbers are contact data entered by operators about people who do not hold accounts. Both count.

### 2. Financial Info → Other Financial Info
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **App Functionality**
- Why: rent due and paid, security deposits, property expenses. Do **not** select Payment Info or Credit Info — stayct stores no card or bank account numbers.

### 3. Location → Coarse Location
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **App Functionality**

### 4. User Content → Photos or Videos
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **App Functionality**
- Why: property images and complaint attachments.

### 5. User Content → Other User Content
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **App Functionality**
- Why: complaint text, property and room descriptions, operational notes.

### 6. Identifiers → User ID
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **App Functionality**, **Analytics**

### 7. Identifiers → Device ID
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **Analytics**, **App Functionality**
- Why: Firebase app-instance ID.

### 8. Usage Data → Product Interaction
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **Analytics**
- Why: Firebase Analytics screen and event logging.

### 9. Diagnostics → Crash Data
- Collected: **Yes**
- Linked to user: **Yes**
- Used for tracking: **No**
- Purposes: **App Functionality**, **Analytics**
- Why: Crashlytics.

### 10. Diagnostics → Performance Data
- Collected: **Yes, only if Firebase Performance Monitoring is in the build.**
- Check `package.json` / Podfile for `@react-native-firebase/perf`. If absent, leave this unselected.

---

## Data types to leave UNSELECTED

Confirm each of these before publishing. Selecting nothing here is only correct if the statement holds.

| Data type | Leave off because |
|---|---|
| Contact Info → Name | You stated residents are stored by phone number only. **Verify**: if the resident record or the operator profile has a name field, this must be selected (Linked, App Functionality). |
| Contact Info → Email Address | No email sign-in. **Verify** no email field exists on operator or resident records. |
| Contact Info → Physical Address | Property addresses are business addresses, not personal ones. If you store a resident's home address, select this. |
| Health & Fitness | Not applicable. |
| Financial Info → Payment Info | No card or bank details stored in-app. |
| Sensitive Info | Not applicable, unless ID documents (Aadhaar, passport) are uploaded — if they are, that is a significant declaration and needs separate thought. |
| Contacts | Only if the app reads the device address book. |
| Browsing History | Not applicable. |
| Search History | Only if in-app search queries are logged to analytics. |
| Purchases | No in-app purchases. |
| Other Data | Not applicable. |

---

## Before you publish

1. Confirm the Name field question above. Under-declaring is the most common cause of an App Privacy rejection.
2. Confirm whether ID proof documents can be uploaded against a resident. If yes, that changes the declaration materially.
3. Make sure the published privacy policy at stayct.in/privacy matches this sheet. Apple compares them.
4. App Privacy is published separately from the version — the **Publish** button in the App Privacy section pushes it live independently of App Review.
