import { getPlaiceholder } from "plaiceholder";
import fs from "fs";
import path from "path";

export async function getAllBlurData(images) {
  const blurData = await Promise.all(
    images.map(async (src) => {
      const file = fs.readFileSync(path.join(process.cwd(), "public", src));
      const { base64 } = await getPlaiceholder(file);
      return base64;
    }),
  );
  return blurData;
}
