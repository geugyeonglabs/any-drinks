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
          {setting?.week.includes("0") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeek(
                  setting.week.filter((element) => element !== "0")
                )
              }
            >
              일
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeek([...setting?.week, "0"])}
            >
              일
            </Button>
          )}
          {setting?.week.includes("1") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeek(
                  setting.week.filter((element) => element !== "1")
                )
              }
            >
              월
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeek([...setting?.week, "1"])}
            >
              월
            </Button>
          )}
          {setting?.week.includes("2") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeek(
                  setting.week.filter((element) => element !== "2")
                )
              }
            >
              화
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeek([...setting?.week, "2"])}
            >
              화
            </Button>
          )}
          {setting?.week.includes("3") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeek(
                  setting.week.filter((element) => element !== "3")
                )
              }
            >
              수
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeek([...setting?.week, "3"])}
            >
              수
            </Button>
          )}
          {setting?.week.includes("4") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeek(
                  setting.week.filter((element) => element !== "4")
                )
              }
            >
              목
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeek([...setting?.week, "4"])}
            >
              목
            </Button>
          )}
          {setting?.week.includes("5") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeek(
                  setting.week.filter((element) => element !== "5")
                )
              }
            >
              금
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeek([...setting?.week, "5"])}
            >
              금
            </Button>
          )}
          {setting?.week.includes("6") ? (
            <Button
              color="blue"
              onClick={() =>
                setting?.setWeek(
                  setting.week.filter((element) => element !== "6")
                )
              }
            >
              토
            </Button>
          ) : (
            <Button
              outline
              onClick={() => setting?.setWeek([...setting?.week, "6"])}
            >
              토
            </Button>
          )}
        </section>
      </main>
    </div>
  );
}
