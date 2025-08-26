"use client";

import { useContext } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import SettingsIcon from "@mui/icons-material/Settings";
import { GlobalContext } from "@/app/GlobalProvider";

export default function Home() {
  const today = dayjs();

  const global = useContext(GlobalContext);

  return (
    <>
      <header className="mb-[5dvh] p-2 text-right">
        <Link href="/period">
          <SettingsIcon fontSize="large" />
        </Link>
      </header>
      <main className="flex flex-col justify-center items-center gap-16">
        <section className="flex flex-col items-center gap-4">
          <div className="text-5xl font-medium">{today.date()}</div>
          <div className="text-3xl">
            {today.day() === 0 && "일요일"}
            {today.day() === 1 && "월요일"}
            {today.day() === 2 && "화요일"}
            {today.day() === 3 && "수요일"}
            {today.day() === 4 && "목요일"}
            {today.day() === 5 && "금요일"}
            {today.day() === 6 && "토요일"}
          </div>
        </section>
        <section className="text-xl text-gray-500">
          금주&nbsp;
          <span className="text-2xl font-medium text-black">
            {today.diff(global?.globalStartDate, "day") + 1}
          </span>
          일째
        </section>
        <section className="flex flex-col items-center gap-6">
          <div className="text-2xl">금주 종료</div>
          <div>
            <span className="text-9xl text-blue-700">
              {global?.globalStartDate
                ?.add(Number(global?.globalPeriod) + 1, "day")
                .diff(today, "day")}
              일
            </span>
            <span className="text-lg text-gray-500">전</span>
          </div>
        </section>
      </main>
      <footer className="absolute bottom-8 flex flex-col items-center w-dvw text-gray-400">
        <div>
          금주 기간은&nbsp;
          {global?.globalStartDate && global?.globalStartDate.month() + 1}.
          {global?.globalStartDate?.date()}
          &nbsp;~&nbsp;
          {global?.globalStartDate &&
            global?.globalStartDate
              .add(Number(global?.globalPeriod) - 1, "day")
              .month() + 1}
          .
          {global?.globalStartDate &&
            global?.globalStartDate
              .add(Number(global?.globalPeriod) - 1, "day")
              .date()}{" "}
          입니다.
        </div>
        <div>
          음주 가능 기간은&nbsp;
          {global?.globalStartDate &&
            global?.globalStartDate
              .add(Number(global?.globalPeriod), "day")
              .month() + 1}
          .
          {global?.globalStartDate &&
            global?.globalStartDate
              .add(Number(global?.globalPeriod), "day")
              .date()}{" "}
          ~ 입니다.
        </div>
      </footer>
    </>
  );
}
