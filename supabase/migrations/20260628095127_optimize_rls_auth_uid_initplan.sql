alter policy "parents can read own profile"
on profiles
using (id = (select auth.uid()));

alter policy "parents can update own profile"
on profiles
using (id = (select auth.uid()));

alter policy "parents can manage own children"
on children
using (parent_id = (select auth.uid()))
with check (parent_id = (select auth.uid()));

alter policy "parents can manage own child missions"
on missions
using (exists (
  select 1
  from children
  where children.id = missions.child_id
    and children.parent_id = (select auth.uid())
))
with check (exists (
  select 1
  from children
  where children.id = missions.child_id
    and children.parent_id = (select auth.uid())
));

alter policy "parents can manage own child mission schedules"
on mission_schedules
using (exists (
  select 1
  from missions
  join children on children.id = missions.child_id
  where missions.id = mission_schedules.mission_id
    and children.parent_id = (select auth.uid())
))
with check (exists (
  select 1
  from missions
  join children on children.id = missions.child_id
  where missions.id = mission_schedules.mission_id
    and children.parent_id = (select auth.uid())
));

alter policy "parents can manage own child mission instances"
on mission_instances
using (exists (
  select 1
  from children
  where children.id = mission_instances.child_id
    and children.parent_id = (select auth.uid())
))
with check (exists (
  select 1
  from children
  where children.id = mission_instances.child_id
    and children.parent_id = (select auth.uid())
));

alter policy "parents can read own child point transactions"
on point_transactions
using (exists (
  select 1
  from children
  where children.id = point_transactions.child_id
    and children.parent_id = (select auth.uid())
));

alter policy "parents can manage own child rewards"
on rewards
using (exists (
  select 1
  from children
  where children.id = rewards.child_id
    and children.parent_id = (select auth.uid())
))
with check (exists (
  select 1
  from children
  where children.id = rewards.child_id
    and children.parent_id = (select auth.uid())
));

alter policy "parents can manage own child reward redemptions"
on reward_redemptions
using (exists (
  select 1
  from children
  where children.id = reward_redemptions.child_id
    and children.parent_id = (select auth.uid())
))
with check (exists (
  select 1
  from children
  where children.id = reward_redemptions.child_id
    and children.parent_id = (select auth.uid())
));

alter policy "parents can manage own child reading entries"
on reading_entries
using (exists (
  select 1
  from children
  where children.id = reading_entries.child_id
    and children.parent_id = (select auth.uid())
))
with check (exists (
  select 1
  from children
  where children.id = reading_entries.child_id
    and children.parent_id = (select auth.uid())
));

alter policy "parents can read own child daily summaries"
on daily_summaries
using (exists (
  select 1
  from children
  where children.id = daily_summaries.child_id
    and children.parent_id = (select auth.uid())
));
