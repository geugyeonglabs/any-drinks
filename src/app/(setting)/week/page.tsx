"use client";

import { useContext } from "react";
import { SettingContext } from "@/app/(setting)/layout";
import { Button } from "@/components/button";

export default function Week() {
  const setting = useContext(SettingContext);

  return (
    <div className="p-4">
      <main className="flex flex-col items-center gap-8">
        <p className="text-gray-400">금주를 진행할 요일을 입력해주세요</p>
        <section className="flex gap-2">
          {setting?.weeks.includes("0") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeeks(setting.weeks.filter((week) => week !== "0"))
              }
            >
              일
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeeks([...setting?.weeks, "0"])}
            >
              일
            </Button>
          )}
          {setting?.weeks.includes("1") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeeks(setting.weeks.filter((week) => week !== "1"))
              }
            >
              월
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeeks([...setting?.weeks, "1"])}
            >
              월
            </Button>
          )}
          {setting?.weeks.includes("2") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeeks(setting.weeks.filter((week) => week !== "2"))
              }
            >
              화
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeeks([...setting?.weeks, "2"])}
            >
              화
            </Button>
          )}
          {setting?.weeks.includes("3") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeeks(setting.weeks.filter((week) => week !== "3"))
              }
            >
              수
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeeks([...setting?.weeks, "3"])}
            >
              수
            </Button>
          )}
          {setting?.weeks.includes("4") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeeks(setting.weeks.filter((week) => week !== "4"))
              }
            >
              목
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeeks([...setting?.weeks, "4"])}
            >
              목
            </Button>
          )}
          {setting?.weeks.includes("5") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeeks(setting.weeks.filter((week) => week !== "5"))
              }
            >
              금
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeeks([...setting?.weeks, "5"])}
            >
              금
            </Button>
          )}
          {setting?.weeks.includes("6") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeeks(setting.weeks.filter((week) => week !== "6"))
              }
            >
              토
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeeks([...setting?.weeks, "6"])}
            >
              토
            </Button>
          )}
        </section>
      </main>
    </div>
  );
}
