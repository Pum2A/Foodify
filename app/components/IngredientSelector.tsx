const IngredientSelector = ({ ingredients, onSelect }: { ingredients: string[], onSelect: (ingredient: string) => void }) => {
    return (
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select an ingredient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </select>
    );
  };
  
  export default IngredientSelector;
  