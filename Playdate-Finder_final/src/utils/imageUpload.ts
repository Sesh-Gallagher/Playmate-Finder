export async function handleImageUpload(file: File): Promise<string> {
  // In a real app, you would upload to a server/cloud storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}