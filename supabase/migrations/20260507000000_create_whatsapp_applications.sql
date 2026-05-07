-- Private table for WhatsApp group sign-ups.
-- Only the service_role (used by the edge function) is allowed to read/write.

create table whatsapp_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  what_you_do text not null,
  ip_address inet,
  user_agent text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  reviewed_at timestamptz,
  notes text
);

create index whatsapp_applications_email_idx
  on whatsapp_applications (email);

create index whatsapp_applications_created_at_idx
  on whatsapp_applications (created_at desc);

alter table whatsapp_applications enable row level security;

-- Defense in depth: revoke any default Data API access. RLS without policies
-- already blocks anon/authenticated, but stripping the GRANTs makes the table
-- unreachable through PostgREST entirely. service_role bypasses both.
revoke all on table whatsapp_applications from anon, authenticated;
