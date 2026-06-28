grant usage on schema public to authenticated;

grant select, insert, update on profiles to authenticated;
grant select, insert, update, delete on children to authenticated;
grant select, insert, update, delete on missions to authenticated;
grant select, insert, update, delete on mission_schedules to authenticated;
grant select, insert, update, delete on mission_instances to authenticated;
grant select, insert on point_transactions to authenticated;
grant select, insert, update, delete on rewards to authenticated;
grant select, insert, update, delete on reward_redemptions to authenticated;
grant select, insert, update, delete on reading_entries to authenticated;
grant select on daily_summaries to authenticated;

create policy "parents can insert own child point transactions"
on point_transactions for insert
to authenticated
with check (exists (
  select 1
  from children
  where children.id = point_transactions.child_id
    and children.parent_id = (select auth.uid())
));

create or replace function public.approve_mission_instances(p_instance_ids uuid[])
returns uuid[]
language plpgsql
security invoker
set search_path = public
as $$
declare
  approved_ids uuid[];
begin
  if coalesce(array_length(p_instance_ids, 1), 0) = 0 then
    return array[]::uuid[];
  end if;

  with approved as (
    update mission_instances
    set
      status = 'approved',
      approved_by = (select auth.uid()),
      approved_at = now(),
      rejected_at = null,
      updated_at = now()
    where id = any(p_instance_ids)
      and status = 'submitted'
    returning
      id,
      child_id,
      title_snapshot,
      points_snapshot,
      stars_snapshot,
      xp_snapshot
  ),
  inserted_transactions as (
    insert into point_transactions (
      child_id,
      type,
      points_delta,
      stars_delta,
      xp_delta,
      ref_table,
      ref_id,
      description
    )
    select
      child_id,
      'mission',
      points_snapshot,
      stars_snapshot,
      xp_snapshot,
      'mission_instances',
      id,
      title_snapshot || ' 미션 승인'
    from approved
    returning 1
  ),
  child_totals as (
    select
      child_id,
      sum(points_snapshot)::int as points_delta,
      sum(stars_snapshot)::int as stars_delta,
      sum(xp_snapshot)::int as xp_delta
    from approved
    group by child_id
  ),
  updated_children as (
    update children
    set
      total_points = children.total_points + child_totals.points_delta,
      total_stars = children.total_stars + child_totals.stars_delta,
      total_xp = children.total_xp + child_totals.xp_delta,
      level = greatest(
        1,
        floor(((children.total_xp + child_totals.xp_delta)::numeric) / 1000)::int + 1
      ),
      updated_at = now()
    from child_totals
    where children.id = child_totals.child_id
    returning 1
  ),
  counts as (
    select
      (select coalesce(array_agg(id), array[]::uuid[]) from approved) as approved_ids,
      (select count(*)::int from inserted_transactions) as transaction_count,
      (select count(*)::int from updated_children) as updated_child_count
  )
  select counts.approved_ids
  into approved_ids
  from counts;

  return approved_ids;
end;
$$;

revoke all on function public.approve_mission_instances(uuid[]) from public;
grant execute on function public.approve_mission_instances(uuid[]) to authenticated;
