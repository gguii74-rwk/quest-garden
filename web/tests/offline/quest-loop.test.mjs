import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const webRoot = process.cwd();
const repoRoot = path.resolve(webRoot, "..");

function readRepoFile(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function compact(value) {
  return value.toLowerCase().replace(/\s+/g, " ");
}

test("mission approval migration keeps RLS-safe transaction invariants", () => {
  const sql = compact(
    readRepoFile(
      "supabase/migrations/20260628011023_mission_server_actions.sql",
    ),
  );

  assert.match(sql, /grant select, insert on point_transactions to authenticated/);
  assert.match(sql, /on point_transactions for insert to authenticated/);
  assert.match(sql, /children\.parent_id = \(select auth\.uid\(\)\)/);

  assert.match(sql, /returns uuid\[\]/);
  assert.match(sql, /security invoker/);
  assert.doesNotMatch(sql, /security definer/);
  assert.match(
    sql,
    /revoke all on function public\.approve_mission_instances\(uuid\[\]\) from public/,
  );
  assert.match(
    sql,
    /grant execute on function public\.approve_mission_instances\(uuid\[\]\) to authenticated/,
  );

  assert.match(sql, /update mission_instances/);
  assert.match(sql, /and status = 'submitted'/);
  assert.match(sql, /insert into point_transactions/);
  assert.match(sql, /update children set total_points = children\.total_points/);
  assert.match(sql, /total_stars = children\.total_stars/);
  assert.match(sql, /total_xp = children\.total_xp/);
});

test("reward migration prevents duplicate open redemptions", () => {
  const sql = compact(
    readRepoFile(
      "supabase/migrations/20260628011503_reward_request_flow.sql",
    ),
  );

  assert.match(sql, /create unique index idx_reward_redemptions_open_request/);
  assert.match(sql, /on reward_redemptions \(reward_id, child_id\)/);
  assert.match(sql, /where status in \('requested', 'approved', 'redeemed'\)/);
});

test("mission server actions only mutate expected statuses", () => {
  const source = readRepoFile("web/src/app/actions/missions.ts");

  assert.match(source, /submitMissionForApproval/);
  assert.match(source, /\.eq\("status", "pending"\)/);
  assert.match(source, /submitted_at: now/);

  assert.match(source, /approveSubmittedMissions/);
  assert.match(source, /\.rpc\(\s*"approve_mission_instances"/);
  assert.match(source, /approvedIds/);

  assert.match(source, /rejectMissionSubmission/);
  assert.match(source, /\.eq\("status", "submitted"\)/);
  assert.match(source, /status: "pending"/);

  assert.equal((source.match(/revalidatePath\("\/"\)/g) ?? []).length, 3);
});

test("reward server action checks unlock and duplicate request guards", () => {
  const source = readRepoFile("web/src/app/actions/rewards.ts");

  assert.match(source, /requestRewardRedemption/);
  assert.match(source, /\.from\("rewards"\)/);
  assert.match(source, /\.eq\("active", true\)/);
  assert.match(source, /child\.total_stars < reward\.required_stars/);
  assert.match(source, /child\.total_points < reward\.required_points/);
  assert.match(source, /\.from\("reward_redemptions"\)/);
  assert.match(source, /\.in\("status", \["requested", "approved", "redeemed"\]\)/);
  assert.match(source, /status: "requested"/);
  assert.match(source, /revalidatePath\("\/"\)/);
});

test("public env example does not ask for a service role key", () => {
  const envExample = readRepoFile("web/.env.example");

  assert.match(envExample, /NEXT_PUBLIC_SUPABASE_URL=/);
  assert.match(envExample, /NEXT_PUBLIC_SUPABASE_ANON_KEY=/);
  assert.doesNotMatch(envExample, /SERVICE_ROLE/i);
});
