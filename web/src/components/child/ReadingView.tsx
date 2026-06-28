import { BookOpen, Plus } from "@phosphor-icons/react";
import type { BookEntry } from "@/lib/questGardenData";

type Props = {
  addingBook: boolean;
  books: BookEntry[];
  onAddBook: () => void;
};

export function ReadingView({ addingBook, books, onAddBook }: Props) {
  return (
    <section className="feature-view">
      <div className="feature-hero">
        <div>
          <span>책장</span>
          <h1>이번 주 {books.length}권을 읽었어요</h1>
        </div>
      </div>
      <div className="bookshelf" aria-label="이번 주 책장">
        {books.length === 0 ? (
          <div className="bookshelf-empty">
            <BookOpen size={32} weight="duotone" />
            <strong>아직 꽂힌 책이 없어요</strong>
            <span>책을 읽고 첫 기록을 남겨요.</span>
          </div>
        ) : (
          books.map((book, index) => (
            <div className={`book-cover ${book.color}`} key={book.id}>
              <BookOpen size={28} weight="duotone" />
              <strong>{book.title}</strong>
              <span>{index + 1}</span>
            </div>
          ))
        )}
      </div>
      <button
        className="wide-action"
        type="button"
        disabled={addingBook}
        onClick={onAddBook}
      >
        <Plus size={24} weight="bold" />
        책 1권 추가
      </button>
    </section>
  );
}
