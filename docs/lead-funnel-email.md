# Lead funnel admin email (Formspree)

This website is **static**. To send an automated admin email summary on lead funnel submissions, we use **Formspree**.

## Setup

1. Create a Formspree form: https://formspree.io/
2. Enable email notifications to: **alazzeh.ml@gmail.com**
3. Copy the form ID (looks like `abcdwxyz`).
4. Create a `.env` file (or add to your deployment env vars) with:

```
VITE_FORMSPREE_FORM_ID=YOUR_FORM_ID
```

## What gets sent

The funnel posts a JSON payload that includes:
- Name
- Email
- Phone
- Company
- Service interest (label)
- Page URL + timestamp

Subject style: **Detailed** (includes name/company/service)

## Notes

- If `VITE_FORMSPREE_FORM_ID` is missing, the funnel still works (it forwards to Contact), but shows a small “not configured” message.
