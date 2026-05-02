# ThesisFlow Security Specification

## Data Invariants
1. A Repository must always belong to an owner (UID).
2. A Commit must belong to a Repository and have a valid author (UID).
3. AI Insights must be linked to a valid Commit ID.
4. User roles can only be set during initialization and cannot be escalated by the user.

## The "Dirty Dozen" Payloads (Denial Tests)
1. Set `ownerId` of another user's repository to self.
2. Create a commit in a repository I don't own/collaborate on.
3. Update `role` to 'supervisor' on self-profile.
4. Delete another user's commit history.
5. Create a repo with a 2MB name string.
6. Skip `createdAt` server timestamp validation.
7. Inject arbitrary keys into an `AIInsight` object.
8. Read private repositories without being the owner.
9. Modify `authorId` on an existing commit.
10. Create an `AIInsight` without an existing `commitId`.
11. Update `message` on a commit that is already marked as 'final' (if status implemented).
12. Bulk list all users' emails without specific UID fetch.

## Security Rules Plan
- Default deny all.
- `users`: allows read if owner. Allow create if matches `request.auth.uid`. Immuteable `role`.
- `repositories`: read if public or owner. Create requires sign-in and owner validation.
- `commits`: read if parent repo readable. Create requires repo access.
- `ai_insights`: read if linked commit readable. Create restricted to system/owner.
