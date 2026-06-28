create unique index idx_reward_redemptions_open_request
on reward_redemptions (reward_id, child_id)
where status in ('requested', 'approved', 'redeemed');
