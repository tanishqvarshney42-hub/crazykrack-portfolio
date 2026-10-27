<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep video identifiers and provider URL helpers in the browser-safe portfolio module so every preview shares one canonical collection.
- Validate project briefs with the shared Zod schema before generating encoded mailto links; the site does not store or send briefs.
- Use Radix-backed design-system dialogs for previews to provide keyboard dismissal, focus trapping and accessible names.
