import { supabaseClient } from '../../utils/server/db.server';

export const uploadHandler = async properties => {
  // TODO Logic to delete avatar if exists
  const { data, filename, contentType } = properties;

  // Get the file as a buffer
  const chunks = [];
  for await (const chunk of data) chunks.push(chunk);
  const buffer = Buffer.concat(chunks);

  const { data: uploadData, error } = await supabaseClient.storage
    .from('avatars')
    .upload(filename, buffer, { contentType });
  if (error) {
    throw error;
  }
  const {
    data: { publicUrl },
  } = supabaseClient.storage.from('avatars').getPublicUrl(uploadData.path);

  return publicUrl;
};
