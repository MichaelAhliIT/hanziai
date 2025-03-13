"use client";

import { useRouter } from "next/navigation";

interface CategoryProps {
  title: string;
}

export const CategoryComponent: React.FC<CategoryProps> = ({ title }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/flashcard/${title.toLowerCase().replace(/\s+/g, "")}`); // Redirects to the category page
  };

  return (
    <div
      className="card bg-base-300 w-full shadow-sm hover:bg-base-200 cursor-pointer active:scale-95"
      onClick={handleClick}
    >
      <div className="card-body flex-row">
        <h2 className="card-title flex-1">{title}</h2>
        <img
          className="size-10 flex-none"
          src={`${title.toLowerCase().replace(/\s+/g, "")}.png`}
          alt=""
        />
      </div>
    </div>
  );
};
