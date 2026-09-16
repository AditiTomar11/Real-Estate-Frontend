const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function uploadImages(files) {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/uploads`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error('Image upload failed');
  const data = await res.json();
  return data.urls; // array of Cloudinary URLs
}