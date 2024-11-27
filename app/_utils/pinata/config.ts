"server only";

import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

export async function getOptimizedImageURL(cid: string) {
  try {
    const signedUrl = await pinata.gateways
      .createSignedURL({
        cid: cid,
        expires: 31536000000,
      })
      .optimizeImage({
        width: 800,
        height: 600,
        fit: "contain",
        format: "webp",
        quality: 90,
      });

    return signedUrl;
  } catch (error) {
    console.error(error);
  }
}
