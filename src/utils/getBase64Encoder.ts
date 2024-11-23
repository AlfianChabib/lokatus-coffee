import { File } from "buffer";
import { encodeBase64 } from "hono/utils/encode";

export async function getBase64Encoder(image: File) {
  const imageType = image.type;
  const byteArrayBuffer = await image.arrayBuffer();
  const base64 = encodeBase64(byteArrayBuffer);
  const stringResult = `data:${imageType};base64,${base64}`;

  return stringResult;
}

export async function getBase64Encoder2(image: globalThis.File) {
  const imageType = image.type;
  const byteArrayBuffer = await image.arrayBuffer();
  const base64 = encodeBase64(byteArrayBuffer);
  const stringResult = `data:${imageType};base64,${base64}`;

  return stringResult;
}
