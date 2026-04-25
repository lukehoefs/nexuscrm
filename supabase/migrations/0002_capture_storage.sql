-- Storage bucket for /capture image uploads.
-- Public read so image_url can be served directly into the dashboard list view;
-- writes are limited to authenticated users.

insert into storage.buckets (id, name, public)
values ('capture-images', 'capture-images', true)
on conflict (id) do nothing;

create policy "capture-images public read"
  on storage.objects for select
  using (bucket_id = 'capture-images');

create policy "capture-images authenticated insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'capture-images');

create policy "capture-images authenticated update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'capture-images')
  with check (bucket_id = 'capture-images');

create policy "capture-images authenticated delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'capture-images');
