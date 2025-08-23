export default function Period() {
  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <main className="flex flex-col items-center gap-12 w-full">
        <p className="text-gray-400">
          금주 시작 일자와
          <br />
          금주 기간을 입력하세요.
        </p>
        <section className="flex justify-between items-center w-full">
          <div className="text-3xl">시작 일자</div>
          <div className="text-xl">08.24</div>
        </section>
        <section className="flex justify-between items-center w-full">
          <div className="text-3xl">금주 기간</div>
          <div className="text-xl">19일</div>
        </section>
      </main>
      <footer className="flex flex-col items-center text-gray-400">
        <div>금주 기간은 08.24 ~ 09.10 입니다.</div>
        <div>음주 가능 기간은 09.11 ~ 09.11 입니다.</div>
      </footer>
    </div>
  );
}
