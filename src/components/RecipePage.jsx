import { useParams } from 'react-router-dom';
import './RecipePage.css';

function RecipePage() {
  const { type } = useParams();

  const recipeDetails = {
    espresso: {
      title: 'Espresso Recipe',
      ingredients: ['Fresh coffee beans', 'Water'],
      steps: [
        'Grind the coffee beans finely.',
        'Preheat your espresso machine.',
        'Pack coffee into the portafilter and brew.'
      ],
      prepTime: '5 minutes',
      serves: '1 cup'
    },
    cappuccino: {
      title: 'Cappuccino Recipe',
      ingredients: ['Espresso', 'Steamed milk', 'Foamed milk'],
      steps: [
        'Prepare an espresso shot.',
        'Steam the milk until frothy.',
        'Pour steamed milk over espresso and top with foam.'
      ],
      prepTime: '10 minutes',
      serves: '1 cup'
    },
    latte: {
      title: 'Latte Recipe',
      ingredients: ['Espresso', 'Steamed milk'],
      steps: [
        'Brew an espresso shot.',
        'Steam milk until creamy.',
        'Pour milk into espresso with minimal foam.'
      ],
      prepTime: '8 minutes',
      serves: '1 cup'
    }
  };

  const recipe = recipeDetails[type];

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-page">
      <h2>{recipe.title}</h2>
      <p><strong>Preparation Time:</strong> {recipe.prepTime}</p>
      <p><strong>Serves:</strong> {recipe.serves}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>

      <h3>Steps</h3>
      <ol>
        {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </div>
  );
}

export default RecipePage;
