"use client";

import { useContext } from "react";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import { GlobalContext } from "@/app/GlobalProvider";

export default function Home() {
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
          <div className="text-5xl font-medium">23</div>
          <div className="text-3xl">토요일</div>
        </section>
        <section className="flex flex-col items-center text-xl text-gray-500">
          <div>
            절주 <span className="text-2xl font-medium text-black">7</span>일차
          </div>
          <div>
            금주 <span className="text-2xl font-medium text-black">7</span>일째
          </div>
        </section>
        <section className="flex flex-col items-center gap-6">
          <div className="text-2xl">금주 종료</div>
          <div>
            <span className="text-9xl text-blue-700">0일</span>
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
