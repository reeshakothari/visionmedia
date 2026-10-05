// Keep in sync with the serverActions.bodySizeLimit in next.config.ts. A few
// MB of slack accounts for multipart/form-data overhead (boundaries, part
// headers) on top of the raw file bytes.
export const MAX_UPLOAD_BYTES = 18 * 1024 * 1024;

export function checkUploadSize(file: File): string | null {
  if (file.size > MAX_UPLOAD_BYTES) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return `That image is ${mb}MB — please use one under 18MB.`;
  }
  return null;
}
