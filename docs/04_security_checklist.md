# Security checklist (SAST/DAST/SCA perspective, own apps only, no third-party scanning)

| Check | Code-based | Low-code (Appsmith) |
|---|---|---|
| Input validation | Strict regexes for HH:MM and whole minutes; tested with empty, malformed, decimal, huge, markup input | Same rules in JS Object; tested only with the 8 cases |
| Injection / XSS (output handling) | Output only via textContent; unit test and UI probe with `<img onerror>` stayed inert; CSP blocks inline script | Text widget renders the message as text; no HTML probe was run here, so NOT verified |
| Secrets | None in code, no API keys, no network calls | No datasource, no secrets, nothing in screenshots |
| Permissions / sharing | Static files, no accounts | App was made PUBLIC and deployed for the demo link (fictional data only, no datasource); not tested while logged out |
| Connector access | None | None configured (no datasource, only a JS Object) |
| Dependencies (SCA) | Zero runtime dependencies | Platform dependencies are Appsmith's responsibility; I cannot inspect them |
| Updates | We patch our code | Appsmith patches the platform; we re-test after platform updates |
| Runtime checks (DAST-lite) | Playwright run against local file, no console or CSP errors | Manual runs in the editor only |
| AI agent / account least privilege | Local tools only | The agent used the user's signed-in Chrome session; it only edited this one app |
