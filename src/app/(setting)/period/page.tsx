"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Field, Label } from "@/components/Fieldset";
import { Input } from "@/components/Input";

export default function Period() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [period, setPeriod] = useState<string>("7");

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <main className="flex flex-col items-center gap-8 w-full">
        <p className="text-gray-400">
          금주 시작 일자와
          <br />
          금주 기간을 입력하세요.
        </p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="시작 일자"
            value={startDate}
            onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
          />
        </LocalizationProvider>
        <section className="flex justify-between items-center w-full">
          <Field>
            <Label>금주 기간</Label>
            <Input
              type="number"
              value={period}
              onChange={(e: { target: { value: string } }) =>
                setPeriod(e.target.value)
              }
            />
          </Field>
          <div className="text-xl">{period}일</div>
        </section>
      </main>
      <footer className="flex flex-col items-center text-gray-400">
        <div>
          금주 기간은 {startDate && startDate.month() + 1}.{startDate?.date()}
          &nbsp;~&nbsp;
          {startDate && startDate.add(Number(period) - 1, "day").month() + 1}.
          {startDate && startDate.add(Number(period) - 1, "day").date()} 입니다.
        </div>
        <div>
          음주 가능 기간은&nbsp;
          {startDate && startDate.add(Number(period), "day").month() + 1}.
          {startDate && startDate.add(Number(period), "day").date()} ~ 입니다.
        </div>
      </footer>
    </div>
  );
}
