import { useState } from "react";
import styled from "styled-components";

interface CategoryType {
  id: number;
  name: string;
  src: string;
}

interface CategoryProps {
  category: CategoryType;
  isSelected: boolean;
  onClick: () => void;
}

interface CategoryListProps {
  onCategoryChange: (selectedCategories: string[]) => void;
}

const categories: CategoryType[] = [
  { id: 1, name: "OUTER", src: "../icon/outer.svg" },
  { id: 2, name: "TOP", src: "../icon/top.svg" },
  { id: 3, name: "PANTS", src: "../icon/pants.svg" },
  { id: 4, name: "NEAT", src: "../icon/neat.svg" },
  { id: 5, name: "JEANS", src: "../icon/jeans.svg" },
  { id: 6, name: "SHOES", src: "../icon/shoes.svg" },
  { id: 7, name: "BAG", src: "../icon/bag.svg" },
  { id: 8, name: "ACC", src: "../icon/cap.svg" },
];

function Category({ category, isSelected, onClick }: CategoryProps) {
  return (
    <CategoryItem onClick={onClick}>
      <AvatarWrapper $isSelected={isSelected}>
        <CategoryAvatar src={category.src} alt={category.name} />
      </AvatarWrapper>
      <CategoryName $isSelected={isSelected}>{category.name}</CategoryName>
    </CategoryItem>
  );
}

export default function CategoryList({ onCategoryChange }: CategoryListProps) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(category.id);
      const updatedCategories = isSelected
        ? prev.filter((id) => id !== category.id)
        : [...prev, category.id];

      const selectedCategoryNames = updatedCategories
        .map((id) => categories.find((cat) => cat.id === id)?.name)
        .filter((name): name is string => name !== undefined);

      onCategoryChange(selectedCategoryNames);
      return updatedCategories;
    });
  };

  return (
    <CategoryContainer>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          isSelected={selectedCategories.includes(category.id)}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  gap: 16px;
    
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1px;
  }
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const AvatarWrapper = styled.div<{ $isSelected: boolean }>`
  width: 70px;
  height: 70px;
  background-color: var(--gray300);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid
    ${({ $isSelected }) => ($isSelected ? "var(--pink100)" : "transparent")};
  border-radius: 50%;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: pink;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

`;

const CategoryAvatar = styled.img`
  width: 70%;
  height: 70%;
`;

const CategoryName = styled.span<{ $isSelected: boolean }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ $isSelected }) => ($isSelected ? "var(--pink100)" : "White")};
  text-align: center;
  @media (max-width: 768px) {
    font-size: 8px;
  }
`;
