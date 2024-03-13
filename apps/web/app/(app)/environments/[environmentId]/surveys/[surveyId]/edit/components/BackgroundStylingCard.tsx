"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@formbricks/lib/cn";
import { TSurvey, TSurveyBackgroundBgType } from "@formbricks/types/surveys";

import SurveyBgSelectorTab from "./SurveyBgSelectorTab";

interface BackgroundStylingCardProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  localSurvey: TSurvey;
  setLocalSurvey: React.Dispatch<React.SetStateAction<TSurvey>>;
  colours: string[];
  disabled?: boolean;
}

export default function BackgroundStylingCard({
  open,
  setOpen,
  localSurvey,
  setLocalSurvey,
  colours,
  disabled,
}: BackgroundStylingCardProps) {
  const { styling } = localSurvey;
  const { bgType } = styling?.background ?? {};

  const [inputValue, setInputValue] = useState(100);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    handleBrightnessChange(parseInt(e.target.value));
  };

  const handleBgChange = (color: string, type: TSurveyBackgroundBgType) => {
    setInputValue(100);
    setLocalSurvey({
      ...localSurvey,
      styling: {
        ...localSurvey.styling,
        background: {
          ...localSurvey.styling?.background,
          bg: color,
          bgType: type,
          brightness: undefined,
        },
      },
    });
  };

  const handleBrightnessChange = (percent: number) => {
    setLocalSurvey({
      ...localSurvey,
      styling: {
        ...(localSurvey.styling || {}),
        background: {
          ...localSurvey.styling?.background,
          brightness: percent,
        },
      },
    });
  };

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={(openState) => {
        if (disabled) return;
        setOpen(openState);
      }}
      className={cn(
        open ? "" : "hover:bg-slate-50",
        "w-full space-y-2 rounded-lg border border-slate-300 bg-white "
      )}>
      <Collapsible.CollapsibleTrigger
        asChild
        disabled={disabled}
        className={cn(
          "h-full w-full cursor-pointer rounded-lg hover:bg-slate-50",
          disabled && "cursor-not-allowed opacity-60 hover:bg-white"
        )}>
        <div className="inline-flex px-4 py-4">
          <div className="flex items-center pl-2 pr-5">
            <CheckIcon
              strokeWidth={3}
              className="h-7 w-7 rounded-full border border-green-300 bg-green-100 p-1.5 text-green-600"
            />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Background Styling</p>
            <p className="mt-1 truncate text-sm text-slate-500">
              Change the background to a color, image or animation.
            </p>
          </div>
        </div>
      </Collapsible.CollapsibleTrigger>
      <Collapsible.CollapsibleContent>
        <hr className="py-1 text-slate-600" />
        <div className="flex flex-col gap-3 p-3">
          {/* Background */}
          <div className="p-3">
            <div className="ml-2">
              <h3 className="text-sm font-semibold text-slate-700">Change Background</h3>
              <p className="text-xs font-normal text-slate-500">
                Pick a background from our library or upload your own.
              </p>
            </div>
            <SurveyBgSelectorTab
              localSurvey={localSurvey}
              handleBgChange={handleBgChange}
              colours={colours}
              bgType={bgType}
            />
          </div>

          {/* Overlay */}
          <div className="p-3">
            <div className="ml-2">
              <h3 className="text-sm font-semibold text-slate-700">Background Overlay</h3>
              <p className="text-xs font-normal text-slate-500">
                Darken or lighten background of your choice.
              </p>
            </div>
            <div>
              <div className="mt-4 flex flex-col justify-center rounded-lg border bg-slate-50 p-6">
                <h3 className="mb-4 text-sm font-semibold text-slate-700">Brightness</h3>
                <input
                  id="small-range"
                  type="range"
                  min="1"
                  max="200"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="range-sm mb-6 h-1 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 dark:bg-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      </Collapsible.CollapsibleContent>
    </Collapsible.Root>
  );
}
