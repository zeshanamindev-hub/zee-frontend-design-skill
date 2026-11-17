# Workflow: reconcile feedback before acting on it

Clients and teams give feedback in fragments, across messages, sometimes contradicting earlier requests or the rules. Acting on each line as it arrives produces Frankenstein designs. Reconcile first.

## Steps
1. **Collect** every requirement and feedback item (this conversation, earlier notes, comments, docs) into `.design/requirements.md` (template: `templates/requirements.md`). One line each, with source and date.
2. **Classify** each item: must (business/legal), should (stated preference), could (nice-to-have), question (ambiguous).
3. **Find conflicts**, of three kinds:
   - *Requirement vs requirement*: "make it minimal" + "add all 12 services to the hero".
   - *Requirement vs rule*: "make the button yellow on white" vs A3 contrast (#FACC15 on white = 1.53:1).
   - *Requirement vs evidence*: "put a carousel in the hero" vs U27 + the client's own analytics.
4. **Resolve**, by the priority order in `../foundations/rules/README.md` §3 (accessibility/legal > usability > conversion > brand > aesthetics):
   - Decide yourself when the rules or evidence settle it, and say why in one line.
   - **Ask** when it's a genuine business choice (two audiences, brand direction, scope/budget). One message, numbered questions, each with options and your recommendation.
5. **Confirm** the reconciled list back to the user in ≤ 10 lines ("Here's what I'll do: …, and what I won't: … because …").
6. **Record** decisions in `.design/decisions.md` (violations per the README §4 workflow).
7. Only then design or change code.

## Response pattern
```
I've merged your feedback into 9 requirements. Two conflict:
1. "Hero: just the headline" vs "show all 4 product lines above the fold".
   → Recommend: headline + 4 compact product-line links under it (meets both).  OK?
2. "Yellow CTA on white": #FACC15 on white is 1.53:1 (button boundary needs 3:1, label 4.5:1).
   → I'll keep your yellow as the button fill with #111111 text (12.33:1) and a 1px darker border. Brand colour kept, accessible.
Everything else is clear; starting with the hero once you confirm #1.
```
(Ratios computed with `scripts/contrast.py`; always compute, never estimate.)
