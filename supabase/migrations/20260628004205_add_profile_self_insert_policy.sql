create policy "parents can insert own profile"
on profiles for insert
to authenticated
with check ((select auth.uid()) = id);
