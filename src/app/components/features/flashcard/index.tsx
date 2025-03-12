import { CategoryComponent } from "../../CategoryComponent";
import { Container } from "../../ContainerComponent";

export const FlashcardPages = () => {
  return (
    <>
      <h1 className="font-bold text-2xl pb-5">Category</h1>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
        <CategoryComponent title="Restaurant" />
        <CategoryComponent title="Travel" />
        <CategoryComponent title="Direction" />
        <CategoryComponent title="Fruits" />
        <CategoryComponent title="School" />
        <CategoryComponent title="Body Parts" />
        <CategoryComponent title="Colors" />
        <CategoryComponent title="Time" />
        <CategoryComponent title="Occupation" />
      </div>
    </>
  );
};
