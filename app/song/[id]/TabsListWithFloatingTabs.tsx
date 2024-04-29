"use client";

import { useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { TabNotes } from "@/server/tabs/tabMaker";
import { TabsMetadata } from "@/lib/songs";
import { Button } from "@/components/ui/Button";
import { BassTabs } from "@/components/ui/BassTabs";

export interface ParsedTabsWithLabel extends Pick<TabsMetadata, "label"> {
  tabs: TabNotes;
}

interface TabsListWithFloatingTabsProps {
  tabsList: Array<ParsedTabsWithLabel>;
}

export const TabsListWithFloatingTabs: React.FC<
  TabsListWithFloatingTabsProps
> = ({ tabsList }) => {
  const [selectedTabIdx, setSelectedTabIdx] = useState<number>();

  const selectedTab = selectedTabIdx == null ? null : tabsList[selectedTabIdx];

  return (
    <>
      <ul>
        {tabsList.map(({ label }, idx) => (
          <li key={idx} className="mt-1 first:mt-0">
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => setSelectedTabIdx(idx)}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
      {selectedTab && (
        <Portal.Root
          className="z-50 fixed top-3 w-auto max-w-[90%] xl:max-w-[75%] flex items-start justify-between bg-background p-3 rounded border-2 shadow-xl"
          style={{
            // Horizontally center the element
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
          // TODO: a11y guidelines say keyboard focus "should be moved to the
          // default focusable control inside the dialog" when the dialog appears.
          // In this case, we could auto-focus the close button.
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role
          // Ideally, we should do that.
          role="dialog"
          aria-label={`Tabs for ${selectedTab.label}`}
        >
          <BassTabs tabs={selectedTab.tabs} className="mr-6" />
          <Button
            className="rounded-full -mt-2"
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={() => setSelectedTabIdx(undefined)}
          >
            <XMarkIcon className="size-6" />
          </Button>
        </Portal.Root>
      )}
    </>
  );
};
