import "server-only";
import { readFile } from "node:fs/promises";
import { z } from "zod";

// TODO: Add support for ghost notes, hammer-ons, and pull-offs.

const FretNumber = z.number().int().nonnegative().brand<"FretNumber">();
export type FretNumber = z.TypeOf<typeof FretNumber>;

const NullableFretNumber = FretNumber.nullable().brand<"NullableFretNumber">();
export type NullableFretNumber = z.TypeOf<typeof NullableFretNumber>;

const TabColumn = z.tuple([
  // G string (assuming standard tuning)
  NullableFretNumber,
  // D string (assuming standard tuning)
  NullableFretNumber,
  // A string (assuming standard tuning)
  NullableFretNumber,
  // E string (assuming standard tuning)
  NullableFretNumber,
]);
export type TabColumn = z.TypeOf<typeof TabColumn>;

export type TabNotes = Array<TabColumn>;

const TabMakerTabsSchema = z.object({
  state: z.object({
    tabs: z.object({
      "0": z.object({
        notes: z.array(TabColumn),
      }),
    }),
  }),
});

/**
 * Parse bass tabs that were exported from [TabMaker.com](https://tab-maker.com).
 *
 * Note: Currently, this function only support a subset of the features
 * supported by TabMaker.
 */
export async function parseNotesFromTabMakerFile(
  tabMakerExportFilename: string,
): Promise<TabNotes> {
  // See Next.js guide on loading data from a file:
  // https://vercel.com/guides/loading-static-file-nextjs-api-route
  const file = await readFile(
    process.cwd() + `/server/tabs/tabMakerExports/${tabMakerExportFilename}`,
    "utf8",
  );

  // TabMaker Base64 encodes the data. Let's decode it.
  const jsonStr = atob(file);

  const obj = JSON.parse(jsonStr);

  const parsedData = TabMakerTabsSchema.parse(obj);
  return parsedData.state.tabs[0].notes;
}
