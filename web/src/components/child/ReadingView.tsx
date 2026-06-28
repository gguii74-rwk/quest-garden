import { BookOpen, Plus } from "@phosphor-icons/react";
import { books } from "@/lib/questGardenData";

export function ReadingView() {
  return (
    <section className="feature-view">
      <div className="feature-hero">
        <div>
          <span>책장</span>
          <h1>이번 주 5권을 읽었어요</h1>
        </div>
      </div>
      <div className="bookshelf" aria-label="이번 주 책장">
        {books.map((book, index) => (
          <div className={`book-cover ${book.color}`} key={book.title}>
            <BookOpen size={28} weight="duotone" />
            <strong>{book.title}</strong>
            <span>{index + 1}</span>
          </div>
        ))}
      </div>
      <button className="wide-action" type="button">
        <Plus size={24} weight="bold" />
        책 1권 추가
      </button>
    </section>
  );
}
