create extension if not exists "pgcrypto";

create type mission_status as enum ('pending', 'submitted', 'approved', 'rejected', 'skipped');
create type repeat_type as enum ('once', 'daily', 'weekdays', 'weekends', 'custom_weekdays');
create type reward_redemption_status as enum ('unlocked', 'requested', 'approved', 'redeemed', 'cancelled');
create type transaction_type as enum ('mission', 'reading', 'achievement', 'reward_adjustment', 'manual_adjustment');
create type avatar_type as enum ('animal', 'robot', 'wizard', 'princess', 'explorer');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'ko',
  timezone text not null default 'Asia/Seoul',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  grade text default '1',
  avatar_type avatar_type not null default 'animal',
  avatar_variant text not null default 'white_persian_cat',
  avatar_name text not null default '솜이',
  avatar_level int not null default 1,
  theme_id text not null default 'storybook_garden',
  total_points int not null default 0,
  total_stars int not null default 0,
  total_xp int not null default 0,
  level int not null default 1,
  current_daily_streak int not null default 0,
  longest_daily_streak int not null default 0,
  current_weekly_streak int not null default 0,
  current_monthly_streak int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table missions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  title text not null,
  icon text not null,
  emoji text,
  category text not null default '기타',
  points int not null default 10,
  stars int not null default 1,
  xp int not null default 10,
  description text,
  requires_parent_approval boolean not null default true,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table mission_schedules (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  repeat_type repeat_type not null default 'daily',
  weekdays int[] not null default '{}',
  start_date date not null default current_date,
  end_date date,
  created_at timestamptz not null default now()
);

create table mission_instances (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  child_id uuid not null references children(id) on delete cascade,
  scheduled_date date not null,
  title_snapshot text not null,
  icon_snapshot text not null,
  category_snapshot text not null,
  points_snapshot int not null,
  stars_snapshot int not null,
  xp_snapshot int not null,
  requires_parent_approval_snapshot boolean not null,
  status mission_status not null default 'pending',
  submitted_at timestamptz,
  approved_by uuid references profiles(id),
  approved_at timestamptz,
  rejected_at timestamptz,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (mission_id, scheduled_date)
);

create table point_transactions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  type transaction_type not null,
  points_delta int not null default 0,
  stars_delta int not null default 0,
  xp_delta int not null default 0,
  ref_table text,
  ref_id uuid,
  description text,
  created_at timestamptz not null default now()
);

create table rewards (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  required_points int not null default 0,
  required_stars int not null default 0,
  repeatable boolean not null default false,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table reward_redemptions (
  id uuid primary key default gen_random_uuid(),
  reward_id uuid not null references rewards(id) on delete cascade,
  child_id uuid not null references children(id) on delete cascade,
  status reward_redemption_status not null default 'unlocked',
  requested_at timestamptz,
  approved_at timestamptz,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);

create table reading_entries (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  title text,
  cover_color text not null default '#F9A8D4',
  cover_image_url text,
  book_count int not null default 1,
  read_date date not null default current_date,
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table daily_summaries (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references children(id) on delete cascade,
  summary_date date not null,
  total_missions int not null default 0,
  approved_missions int not null default 0,
  submitted_missions int not null default 0,
  earned_points int not null default 0,
  earned_stars int not null default 0,
  earned_xp int not null default 0,
  reading_count int not null default 0,
  completion_rate numeric not null default 0,
  is_goal_day boolean not null default false,
  is_perfect_day boolean not null default false,
  visual_stage int not null default 0,
  updated_at timestamptz not null default now(),
  unique (child_id, summary_date)
);

create index idx_children_parent_id on children(parent_id);
create index idx_missions_child_id on missions(child_id);
create index idx_mission_instances_child_date on mission_instances(child_id, scheduled_date);
create index idx_reading_entries_child_date on reading_entries(child_id, read_date);
create index idx_daily_summaries_child_date on daily_summaries(child_id, summary_date);
create index idx_rewards_child_id on rewards(child_id);
create index idx_reward_redemptions_child_id on reward_redemptions(child_id);

alter table profiles enable row level security;
alter table children enable row level security;
alter table missions enable row level security;
alter table mission_schedules enable row level security;
alter table mission_instances enable row level security;
alter table point_transactions enable row level security;
alter table rewards enable row level security;
alter table reward_redemptions enable row level security;
alter table reading_entries enable row level security;
alter table daily_summaries enable row level security;

create policy "parents can read own profile"
on profiles for select
using (id = auth.uid());

create policy "parents can update own profile"
on profiles for update
using (id = auth.uid());

create policy "parents can manage own children"
on children for all
using (parent_id = auth.uid())
with check (parent_id = auth.uid());

create policy "parents can manage own child missions"
on missions for all
using (exists (
  select 1 from children
  where children.id = missions.child_id
    and children.parent_id = auth.uid()
))
with check (exists (
  select 1 from children
  where children.id = missions.child_id
    and children.parent_id = auth.uid()
));

create policy "parents can manage own child mission schedules"
on mission_schedules for all
using (exists (
  select 1
  from missions
  join children on children.id = missions.child_id
  where missions.id = mission_schedules.mission_id
    and children.parent_id = auth.uid()
))
with check (exists (
  select 1
  from missions
  join children on children.id = missions.child_id
  where missions.id = mission_schedules.mission_id
    and children.parent_id = auth.uid()
));

create policy "parents can manage own child mission instances"
on mission_instances for all
using (exists (
  select 1 from children
  where children.id = mission_instances.child_id
    and children.parent_id = auth.uid()
))
with check (exists (
  select 1 from children
  where children.id = mission_instances.child_id
    and children.parent_id = auth.uid()
));

create policy "parents can read own child point transactions"
on point_transactions for select
using (exists (
  select 1 from children
  where children.id = point_transactions.child_id
    and children.parent_id = auth.uid()
));

create policy "parents can manage own child rewards"
on rewards for all
using (exists (
  select 1 from children
  where children.id = rewards.child_id
    and children.parent_id = auth.uid()
))
with check (exists (
  select 1 from children
  where children.id = rewards.child_id
    and children.parent_id = auth.uid()
));

create policy "parents can manage own child reward redemptions"
on reward_redemptions for all
using (exists (
  select 1 from children
  where children.id = reward_redemptions.child_id
    and children.parent_id = auth.uid()
))
with check (exists (
  select 1 from children
  where children.id = reward_redemptions.child_id
    and children.parent_id = auth.uid()
));

create policy "parents can manage own child reading entries"
on reading_entries for all
using (exists (
  select 1 from children
  where children.id = reading_entries.child_id
    and children.parent_id = auth.uid()
))
with check (exists (
  select 1 from children
  where children.id = reading_entries.child_id
    and children.parent_id = auth.uid()
));

create policy "parents can read own child daily summaries"
on daily_summaries for select
using (exists (
  select 1 from children
  where children.id = daily_summaries.child_id
    and children.parent_id = auth.uid()
));
