# System Design: NYSC Career coach V1

1. ARCHITECTURE DIAGRAM
   [User Phone] -> [Vercel / Netlify (Static HTML)] 
                -> [Google Apps Script API] 
                -> [Google Sheet (DB)] 
                -> [Email: Future - Mailchimp]

2. TECH STACK
   Frontend: HTML, CSS, Vanilla JS (No React - to keep fast)
   Backend: Google Apps Script (Free, no server)
   Hosting: Vercel
   Analytics: Google Analytics (optional)

3. DATA MODEL
   Table: leads
   - email: string, unique, required
   - timestamp: datetime
   - source: string

4. API CONTRACT
   POST /exec
   Request: { email, source }
   Response: { result: "success" | "duplicate" | "error" }

5. NON-FUNCTIONAL REQUIREMENTS
   - Availability: 99% (Google handles it)
   - Performance: First paint < 1.5s
   - Security: No spam - add honeypot + rate limit
   - Scalability: Sheet handles 10k rows max, then move to Supabase

6. EDGE CASES & FAILURES
   - What if Sheet API fails? -> Save to localStorage fallback
   - What if duplicate email? -> Show "already subscribed"
   - What if user is offline? -> Checklist still works offline

7. FUTURE (V2)
   - Move DB from Sheet to Supabase
   - Add auth for full 4-week course portal