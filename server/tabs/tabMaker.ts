import "server-only";
import { readFile } from "node:fs/promises";
import { z } from "zod";

const FretNumber = z.number().int().nonnegative().brand<"FretNumber">();
export type FretNumber = z.TypeOf<typeof FretNumber>;

enum TabMakerNonNumericSymbol {
  GHOST_NOTE = "x",
  HAMMER_ON = "h",
  PULL_OFF = "p",
  SLIDE_UP = "/",
  // Note: The symbol is just a backslash, but it needs to be escaped here.
  SLIDE_DOWN = "\\",
}

const TabMakerNonNumericSymbolZodEnum = z.enum([
  TabMakerNonNumericSymbol.GHOST_NOTE,
  TabMakerNonNumericSymbol.HAMMER_ON,
  TabMakerNonNumericSymbol.PULL_OFF,
  TabMakerNonNumericSymbol.SLIDE_UP,
  TabMakerNonNumericSymbol.SLIDE_DOWN,
]);

const TabColumnValue = z.union([
  z.null(),
  FretNumber,
  TabMakerNonNumericSymbolZodEnum,
]);

export type TabColumnValue = z.TypeOf<typeof TabColumnValue>;

const TabColumn = z.tuple([
  // G string (assuming standard tuning)
  TabColumnValue,
  // D string (assuming standard tuning)
  TabColumnValue,
  // A string (assuming standard tuning)
  TabColumnValue,
  // E string (assuming standard tuning)
  TabColumnValue,
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
  const file = await readTabMakerFile(tabMakerExportFilename);

  // TabMaker Base64 encodes the data. Let's decode it.
  const jsonStr = atob(file);

  const obj = JSON.parse(jsonStr);

  const parsedData = TabMakerTabsSchema.parse(obj);
  return parsedData.state.tabs[0].notes;
}

// ! WARNING
// If you move the TabMaker export files to another dir, you MUST update the
// `outputFileTracingIncludes` config option in `next.config.mjs` to reflect
// the change. Otherwise, the TabMaker export files will not be included in
// the build on Vercel.
const TAB_MAKER_EXPORTS_PATH = "/server/tabs/tabMakerExports";

async function readTabMakerFile(
  tabMakerExportFilename: string,
): Promise<string> {
  // See Next.js guide on loading data from a file:
  // https://vercel.com/guides/loading-static-file-nextjs-api-route
  const file = await readFile(
    process.cwd() + `${TAB_MAKER_EXPORTS_PATH}/${tabMakerExportFilename}`,
    "utf8",
  );

  return file;
}
