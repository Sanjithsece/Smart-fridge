import { useState } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [manualInput, setManualInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [cameraIp, setCameraIp] = useState('http://172.31.92.119:8080');
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const ingredientDatabase = {
    "Onion": {
  "description": "A versatile bulb vegetable used worldwide for its strong flavor and nutritional benefits.",
  "vitamins": ["Vitamin C (20% DV)", "Vitamin B6 (10% DV)", "Folate (5% DV)", "Potassium (7% DV)"],
  "storageTips": "Store in a cool, dry, well-ventilated place. Avoid refrigerating whole onions.",
  "seasonality": "Year-round, peak season is March-August",
  "youtubeLink": "https://www.youtube.com/results?search_query=onion+recipes",
  "recipes": [
    {
      "id": 1,
      "name": "Caramelized Onion",
      "time": "40 min",
      "difficulty": "Easy",
      "servings": "4",
      "youtubeLink": "https://www.youtube.com/watch?v=4uR1e8hQrZk",
      "ingredients": [
        "4 large onions, thinly sliced",
        "3 tablespoons olive oil",
        "1 tablespoon butter",
        "1/2 teaspoon salt",
        "1/4 teaspoon sugar (optional)",
        "1 tablespoon balsamic vinegar (optional)"
      ],
      "steps": [
        "Heat oil and butter in a large pan over medium heat.",
        "Add onions and salt, cook stirring occasionally.",
        "After 10 minutes, reduce heat to low and cook for 30 minutes, stirring often.",
        "Optional: add sugar for extra sweetness and balsamic for depth.",
        "Cook until onions are deep golden brown."
      ],
      "tips": "Be patient! Slow cooking brings out the sweetness.",
      "nutrition": {
        "calories": "100",
        "protein": "1g",
        "carbs": "12g",
        "fat": "6g",
        "fiber": "2g"
      }
    },
    {
      "id": 2,
      "name": "French Onion Soup",
      "time": "45 min",
      "difficulty": "Medium",
      "servings": "6",
      "youtubeLink": "https://www.youtube.com/watch?v=4uR1e8hQrZk",
      "ingredients": [
        "6 large onions, thinly sliced",
        "3 tablespoons butter",
        "1 tablespoon olive oil",
        "1/4 cup dry white wine",
        "6 cups beef broth",
        "1 teaspoon thyme",
        "Salt and pepper to taste",
        "6 slices toasted baguette",
        "1 cup grated Gruyère cheese"
      ],
      "steps": [
        "In a large pot, melt butter and oil, add onions and cook until caramelized (30 min).",
        "Add wine, simmer until reduced.",
        "Add broth and thyme, simmer 10 minutes.",
        "Season with salt and pepper.",
        "Serve in bowls with toast and melted cheese on top."
      ],
      "tips": "Use sweet onions for richer flavor.",
      "nutrition": {
        "calories": "320",
        "protein": "13g",
        "carbs": "22g",
        "fat": "18g",
        "fiber": "3g"
      }
    },
    {
      "id": 3,
      "name": "Onion Bhaji (Fritters)",
      "time": "20 min",
      "difficulty": "Easy",
      "servings": "4",
      "youtubeLink": "https://www.youtube.com/watch?v=4uR1e8hQrZk",
      "ingredients": [
        "2 large onions, thinly sliced",
        "1 cup chickpea flour",
        "1/2 teaspoon turmeric",
        "1/2 teaspoon chili powder",
        "1/2 teaspoon cumin seeds",
        "Salt to taste",
        "Water as needed",
        "Oil for deep frying"
      ],
      "steps": [
        "Mix all ingredients except water and oil in a bowl.",
        "Slowly add water to form a thick batter.",
        "Heat oil in a pan, drop spoonfuls of batter and fry until golden brown.",
        "Drain on paper towels before serving."
      ],
      "tips": "Serve hot with mint chutney or ketchup.",
      "nutrition": {
        "calories": "200",
        "protein": "5g",
        "carbs": "22g",
        "fat": "10g",
        "fiber": "3g"
      }
    },
    {
      "id": 4,
      "name": "Stuffed Onions",
      "time": "50 min",
      "difficulty": "Medium",
      "servings": "4",
      "youtubeLink": "https://www.youtube.com/watch?v=4uR1e8hQrZk",
      "ingredients": [
        "4 large onions",
        "1 cup cooked rice",
        "1/2 cup ground meat or paneer",
        "1/4 cup chopped herbs (parsley, cilantro)",
        "2 tablespoons olive oil",
        "1/2 teaspoon salt",
        "1/4 teaspoon pepper",
        "Tomato sauce for baking"
      ],
      "steps": [
        "Boil onions until layers are soft and separate.",
        "Mix filling ingredients together in a bowl.",
        "Stuff each onion layer with filling.",
        "Place in baking dish, cover with tomato sauce.",
        "Bake at 375°F (190°C) for 30 minutes."
      ],
      "tips": "Use vegetarian or meat filling as preferred.",
      "nutrition": {
        "calories": "250",
        "protein": "10g",
        "carbs": "28g",
        "fat": "12g",
        "fiber": "4g"
      }
    },
    {
      "id": 5,
      "name": "Onion Chutney",
      "time": "15 min",
      "difficulty": "Easy",
      "servings": "6",
      "youtubeLink": "https://www.youtube.com/watch?v=4uR1e8hQrZk",
      "ingredients": [
        "2 large onions, chopped",
        "2 dried red chilies",
        "1 tablespoon oil",
        "1 teaspoon tamarind paste",
        "Salt to taste",
        "1/2 teaspoon mustard seeds (for tempering)",
        "5 curry leaves"
      ],
      "steps": [
        "Heat oil, sauté onions and chilies until golden.",
        "Cool and blend with tamarind and salt.",
        "Heat a little oil, add mustard seeds and curry leaves.",
        "Pour tempering over chutney and mix well."
      ],
      "tips": "Perfect with dosa, idli, or as a sandwich spread.",
      "nutrition": {
        "calories": "70",
        "protein": "1g",
        "carbs": "8g",
        "fat": "4g",
        "fiber": "1g"
      }
    }
  ]
},
    "Carrot": {
      description: "Sweet root vegetable rich in beta-carotene which converts to vitamin A in the body.",
      vitamins: ["Vitamin A (428% DV)", "Vitamin K (21% DV)", "Potassium (9% DV)", "Fiber (12% DV)"],
      storageTips: "Remove greens and store in plastic bag in refrigerator crisper for several weeks.",
      seasonality: "Year-round, peak season is summer and fall",
      youtubeLink: "https://www.youtube.com/results?search_query=carrot+recipes",
      recipes: [
        {
          id: 6,
          name: "Honey Glazed Carrots",
          time: "20 min",
          difficulty: "Easy",
          servings: "4",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "1 lb carrots, peeled and sliced",
            "2 tablespoons butter",
            "2 tablespoons honey",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1 tablespoon fresh parsley, chopped"
          ],
          steps: [
            "Steam or boil carrots until tender-crisp (5-7 min).",
            "Melt butter in skillet over medium heat.",
            "Add honey, salt, and pepper, stir to combine.",
            "Add carrots and toss to coat with glaze.",
            "Cook 2-3 minutes until glazed.",
            "Garnish with fresh parsley before serving."
          ],
          tips: "For extra flavor, add a pinch of cinnamon or nutmeg to the glaze.",
          nutrition: {
            calories: "120",
            protein: "1g",
            carbs: "18g",
            fat: "6g",
            fiber: "3g"
          }
        },
        {
          id: 7,
          name: "Carrot Ginger Soup",
          time: "35 min",
          difficulty: "Easy",
          servings: "6",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "2 lbs carrots, peeled and chopped",
            "1 onion, chopped",
            "2 tablespoons fresh ginger, grated",
            "3 cloves garlic, minced",
            "4 cups vegetable broth",
            "1 can (13.5 oz) coconut milk",
            "2 tablespoons olive oil",
            "1 teaspoon salt",
            "1/2 teaspoon black pepper",
            "1 tablespoon lime juice"
          ],
          steps: [
            "Heat oil in large pot over medium heat.",
            "Add onion, ginger, and garlic, cook 5 min until soft.",
            "Add carrots and broth, bring to boil.",
            "Reduce heat and simmer 20 min until carrots are tender.",
            "Puree soup with immersion blender or in batches.",
            "Stir in coconut milk, salt, pepper, and lime juice.",
            "Simmer 5 more minutes before serving."
          ],
          tips: "Garnish with a swirl of coconut milk and fresh cilantro for presentation.",
          nutrition: {
            calories: "180",
            protein: "3g",
            carbs: "20g",
            fat: "11g",
            fiber: "5g"
          }
        },
        {
          id: 8,
          name: "Carrot Cake",
          time: "1 hr 15 min",
          difficulty: "Medium",
          servings: "12",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "2 cups all-purpose flour",
            "2 teaspoons baking soda",
            "1/2 teaspoon salt",
            "2 teaspoons cinnamon",
            "1/2 teaspoon nutmeg",
            "1 1/2 cups sugar",
            "1 cup vegetable oil",
            "4 eggs",
            "3 cups grated carrots",
            "1 cup chopped walnuts (optional)",
            "For cream cheese frosting:",
            "8 oz cream cheese, softened",
            "1/4 cup butter, softened",
            "2 cups powdered sugar",
            "1 teaspoon vanilla extract"
          ],
          steps: [
            "Preheat oven to 350°F (175°C). Grease 9x13 pan.",
            "Whisk together flour, baking soda, salt, cinnamon, and nutmeg.",
            "In separate bowl, beat sugar and oil. Add eggs one at a time.",
            "Gradually add dry ingredients to wet, mixing just until combined.",
            "Fold in carrots and walnuts.",
            "Pour into pan and bake 35-40 min until toothpick comes out clean.",
            "For frosting: beat cream cheese and butter until smooth.",
            "Gradually add powdered sugar and vanilla, beat until fluffy.",
            "Frost cooled cake."
          ],
          tips: "For extra moist cake, let it sit overnight before serving.",
          nutrition: {
            calories: "450",
            protein: "5g",
            carbs: "52g",
            fat: "26g",
            fiber: "2g"
          }
        },
        {
          id: 9,
          name: "Roasted Carrots with Tahini",
          time: "30 min",
          difficulty: "Easy",
          servings: "4",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "1 lb carrots, halved lengthwise",
            "2 tablespoons olive oil",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1/4 cup tahini",
            "2 tablespoons lemon juice",
            "1 garlic clove, minced",
            "2 tablespoons water",
            "2 tablespoons chopped parsley",
            "1 tablespoon sesame seeds"
          ],
          steps: [
            "Preheat oven to 425°F (220°C).",
            "Toss carrots with oil, salt, and pepper on baking sheet.",
            "Roast 20-25 min until tender and caramelized.",
            "Whisk together tahini, lemon juice, garlic, and water.",
            "Drizzle tahini sauce over roasted carrots.",
            "Garnish with parsley and sesame seeds."
          ],
          tips: "For extra flavor, sprinkle with za'atar seasoning before serving.",
          nutrition: {
            calories: "190",
            protein: "4g",
            carbs: "16g",
            fat: "14g",
            fiber: "5g"
          }
        },
        {
          id: 10,
          name: "Carrot Slaw",
          time: "15 min",
          difficulty: "Easy",
          servings: "6",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "4 cups grated carrots",
            "1/2 cup raisins",
            "1/2 cup mayonnaise",
            "2 tablespoons apple cider vinegar",
            "1 tablespoon honey",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1/4 cup chopped walnuts"
          ],
          steps: [
            "In large bowl, combine carrots and raisins.",
            "In small bowl, whisk together mayonnaise, vinegar, honey, salt, and pepper.",
            "Pour dressing over carrot mixture and toss to coat.",
            "Refrigerate at least 1 hour before serving.",
            "Top with walnuts just before serving."
          ],
          tips: "For a lighter version, substitute Greek yogurt for half the mayonnaise.",
          nutrition: {
            calories: "180",
            protein: "2g",
            carbs: "18g",
            fat: "12g",
            fiber: "3g"
          }
        }
      ]
    },
    "Tomato": {
      description: "Juicy, sweet-savory fruits that are technically berries but used as vegetables in cooking.",
      vitamins: ["Vitamin C (28% DV)", "Vitamin K (12% DV)", "Potassium (8% DV)", "Lycopene (antioxidant)"],
      storageTips: "Store at room temperature away from sunlight. Refrigerate only when very ripe.",
      seasonality: "Summer to early fall",
      youtubeLink: "https://www.youtube.com/results?search_query=tomato+recipes",
      recipes: [
        {
          id: 11,
          name: "Classic Bruschetta",
          time: "15 min",
          difficulty: "Easy",
          servings: "6",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "4 ripe tomatoes, diced",
            "1/4 cup fresh basil, chopped",
            "2 garlic cloves, minced",
            "2 tablespoons olive oil",
            "1 tablespoon balsamic vinegar",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1 baguette, sliced",
            "2 tablespoons olive oil for brushing"
          ],
          steps: [
            "Combine tomatoes, basil, garlic, olive oil, vinegar, salt, and pepper in bowl.",
            "Let mixture sit at room temperature for 10-15 minutes.",
            "Brush bread slices with olive oil and toast until golden.",
            "Top each toast with tomato mixture just before serving."
          ],
          tips: "For best flavor, use vine-ripened tomatoes in season.",
          nutrition: {
            calories: "150",
            protein: "3g",
            carbs: "18g",
            fat: "7g",
            fiber: "2g"
          }
        },
        {
          id: 12,
          name: "Homemade Tomato Sauce",
          time: "45 min",
          difficulty: "Easy",
          servings: "6",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "2 lbs ripe tomatoes, peeled and chopped",
            "3 tablespoons olive oil",
            "1 onion, diced",
            "3 garlic cloves, minced",
            "1/4 cup fresh basil, chopped",
            "1 teaspoon salt",
            "1/2 teaspoon black pepper",
            "1/2 teaspoon sugar (optional)",
            "1/4 teaspoon red pepper flakes (optional)"
          ],
          steps: [
            "Heat oil in large saucepan over medium heat.",
            "Add onion and cook until soft (5 min).",
            "Add garlic and cook 1 minute until fragrant.",
            "Add tomatoes, salt, pepper, and sugar if using.",
            "Simmer uncovered 30-40 minutes, stirring occasionally.",
            "Stir in basil and red pepper flakes if using.",
            "Use immersion blender for smoother sauce if desired."
          ],
          tips: "Freeze extra sauce in portions for quick pasta meals later.",
          nutrition: {
            calories: "90",
            protein: "2g",
            carbs: "8g",
            fat: "7g",
            fiber: "2g"
          }
        },
        {
          id: 13,
          name: "Caprese Salad",
          time: "10 min",
          difficulty: "Easy",
          servings: "4",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "4 ripe tomatoes, sliced",
            "8 oz fresh mozzarella, sliced",
            "1/4 cup fresh basil leaves",
            "2 tablespoons olive oil",
            "1 tablespoon balsamic glaze",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper"
          ],
          steps: [
            "Arrange alternating slices of tomato and mozzarella on platter.",
            "Tuck basil leaves between slices.",
            "Drizzle with olive oil and balsamic glaze.",
            "Sprinkle with salt, pepper.",
            "Serve immediately."
          ],
          tips: "Use heirloom tomatoes in different colors for a beautiful presentation.",
          nutrition: {
            calories: "220",
            protein: "10g",
            carbs: "6g",
            fat: "18g",
            fiber: "1g"
          }
        },
        {
          id: 14,
          name: "Tomato Soup",
          time: "30 min",
          difficulty: "Easy",
          servings: "4",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "2 lbs tomatoes, quartered",
            "1 onion, chopped",
            "3 garlic cloves, minced",
            "2 cups vegetable broth",
            "1/2 cup heavy cream",
            "2 tablespoons butter",
            "2 tablespoons olive oil",
            "1 teaspoon salt",
            "1/2 teaspoon black pepper",
            "1 teaspoon sugar",
            "1/4 cup fresh basil, chopped"
          ],
          steps: [
            "Heat oil and butter in large pot over medium heat.",
            "Add onion and garlic, cook until soft (5 min).",
            "Add tomatoes, broth, salt, pepper, and sugar.",
            "Bring to boil, then reduce heat and simmer 20 min.",
            "Use immersion blender to puree soup until smooth.",
            "Stir in cream and heat through (do not boil).",
            "Garnish with fresh basil before serving."
          ],
          tips: "Serve with grilled cheese sandwiches for classic comfort food.",
          nutrition: {
            calories: "220",
            protein: "3g",
            carbs: "15g",
            fat: "18g",
            fiber: "3g"
          }
        },
        {
          id: 15,
          name: "Stuffed Tomatoes",
          time: "45 min",
          difficulty: "Medium",
          servings: "6",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "6 large tomatoes",
            "1/2 cup breadcrumbs",
            "1/2 cup grated Parmesan",
            "2 garlic cloves, minced",
            "1/4 cup fresh parsley, chopped",
            "2 tablespoons olive oil",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1/2 teaspoon dried oregano"
          ],
          steps: [
            "Preheat oven to 375°F (190°C).",
            "Cut tops off tomatoes and scoop out pulp (reserve for other uses).",
            "Mix breadcrumbs, Parmesan, garlic, parsley, oil, and seasonings.",
            "Stuff tomatoes with breadcrumb mixture.",
            "Place in baking dish and bake 25-30 minutes until tops are golden."
          ],
          tips: "Add cooked rice or ground meat to stuffing for a heartier version.",
          nutrition: {
            calories: "130",
            protein: "5g",
            carbs: "12g",
            fat: "7g",
            fiber: "2g"
          }
        }
      ]
    },
    "Spinach": {
      description: "Leafy green vegetable packed with iron, calcium, and numerous vitamins and minerals.",
      vitamins: ["Vitamin K (460% DV)", "Vitamin A (188% DV)", "Folate (49% DV)", "Iron (15% DV)"],
      storageTips: "Store unwashed in plastic bag with paper towel to absorb moisture for up to 5 days.",
      seasonality: "Year-round, peak in spring and fall",
      youtubeLink: "https://www.youtube.com/results?search_query=spinach+recipes",
      recipes: [
        {
          id: 16,
          name: "Creamed Spinach",
          time: "20 min",
          difficulty: "Easy",
          servings: "4",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "1 lb fresh spinach, washed",
            "2 tablespoons butter",
            "2 tablespoons flour",
            "1 cup milk",
            "1/4 teaspoon nutmeg",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1/4 cup grated Parmesan"
          ],
          steps: [
            "Blanch spinach in boiling water for 1 minute, then drain and squeeze dry.",
            "Chop spinach coarsely.",
            "Melt butter in saucepan, whisk in flour to make roux.",
            "Gradually whisk in milk until smooth.",
            "Cook until thickened (3-4 min).",
            "Stir in spinach, nutmeg, salt, and pepper.",
            "Sprinkle with Parmesan before serving."
          ],
          tips: "For richer version, substitute half the milk with heavy cream.",
          nutrition: {
            calories: "120",
            protein: "6g",
            carbs: "8g",
            fat: "8g",
            fiber: "3g"
          }
        },
        {
          id: 17,
          name: "Spinach Salad",
          time: "15 min",
          difficulty: "Easy",
          servings: "4",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "6 cups baby spinach",
            "1/2 cup sliced strawberries",
            "1/4 cup crumbled feta",
            "1/4 cup candied pecans",
            "2 tablespoons red onion, thinly sliced",
            "For dressing:",
            "2 tablespoons olive oil",
            "1 tablespoon balsamic vinegar",
            "1 teaspoon honey",
            "1/2 teaspoon Dijon mustard",
            "1/8 teaspoon salt",
            "1/8 teaspoon black pepper"
          ],
          steps: [
            "Combine spinach, strawberries, feta, pecans, and onion in large bowl.",
            "Whisk together dressing ingredients in small bowl.",
            "Drizzle dressing over salad and toss gently just before serving."
          ],
          tips: "Add grilled chicken for a complete meal.",
          nutrition: {
            calories: "160",
            protein: "4g",
            carbs: "10g",
            fat: "12g",
            fiber: "2g"
          }
        },
        {
          id: 18,
          name: "Spinach and Feta Stuffed Chicken",
          time: "40 min",
          difficulty: "Medium",
          servings: "4",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "4 boneless, skinless chicken breasts",
            "5 oz fresh spinach, chopped",
            "1/2 cup feta cheese, crumbled",
            "2 garlic cloves, minced",
            "1 tablespoon olive oil",
            "1 teaspoon dried oregano",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1/4 cup breadcrumbs",
            "1 tablespoon melted butter"
          ],
          steps: [
            "Preheat oven to 375°F (190°C).",
            "Cut pocket in each chicken breast.",
            "Sauté spinach and garlic in oil until wilted (2 min).",
            "Mix spinach with feta, oregano, salt, and pepper.",
            "Stuff chicken breasts with spinach mixture, secure with toothpicks.",
            "Mix breadcrumbs with melted butter, press onto chicken.",
            "Bake 25-30 min until chicken reaches 165°F (74°C)."
          ],
          tips: "Pound chicken to even thickness for more even cooking.",
          nutrition: {
            calories: "280",
            protein: "32g",
            carbs: "7g",
            fat: "14g",
            fiber: "1g"
          }
        },
        {
          id: 19,
          name: "Spinach Smoothie",
          time: "5 min",
          difficulty: "Easy",
          servings: "2",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "2 cups fresh spinach",
            "1 banana, frozen",
            "1 cup almond milk",
            "1 tablespoon peanut butter",
            "1 tablespoon honey",
            "1/2 teaspoon vanilla extract",
            "1/2 cup ice cubes"
          ],
          steps: [
            "Combine all ingredients in blender.",
            "Blend until smooth.",
            "Add more milk if too thick.",
            "Serve immediately."
          ],
          tips: "Add a scoop of protein powder for a post-workout boost.",
          nutrition: {
            calories: "150",
            protein: "4g",
            carbs: "27g",
            fat: "4g",
            fiber: "3g"
          }
        },
        {
          id: 20,
          name: "Spinach and Mushroom Quiche",
          time: "1 hr 10 min",
          difficulty: "Medium",
          servings: "8",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "1 pie crust (store-bought or homemade)",
            "1 tablespoon olive oil",
            "8 oz mushrooms, sliced",
            "4 cups fresh spinach",
            "4 eggs",
            "1 cup heavy cream",
            "1 cup shredded cheese (Swiss or cheddar)",
            "1/2 teaspoon salt",
            "1/4 teaspoon black pepper",
            "1/4 teaspoon nutmeg"
          ],
          steps: [
            "Preheat oven to 375°F (190°C).",
            "Blind bake crust for 10 minutes.",
            "Sauté mushrooms in oil until golden (5 min).",
            "Add spinach and cook until wilted (2 min).",
            "Whisk eggs, cream, salt, pepper, and nutmeg.",
            "Spread mushroom-spinach mixture in crust.",
            "Sprinkle with cheese.",
            "Pour egg mixture over top.",
            "Bake 35-40 min until set.",
            "Let cool 10 min before slicing."
          ],
          tips: "Make ahead and reheat for easy breakfasts throughout the week.",
          nutrition: {
            calories: "280",
            protein: "10g",
            carbs: "14g",
            fat: "21g",
            fiber: "1g"
          }
        }
      ]
    },
    "Potato": {
      description: "Versatile starchy tuber that's a good source of vitamin C, potassium, and fiber.",
      vitamins: ["Vitamin C (30% DV)", "Potassium (15% DV)", "Vitamin B6 (10% DV)", "Fiber (7% DV)"],
      storageTips: "Store in cool, dark place with good ventilation. Don't refrigerate.",
      seasonality: "Year-round, new potatoes in summer",
      youtubeLink: "https://www.youtube.com/results?search_query=potato+recipes",
      recipes: [
        {
          id: 21,
          name: "Garlic Mashed Potatoes",
          time: "30 min",
          difficulty: "Easy",
          servings: "6",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "2 lbs potatoes, peeled and cubed",
            "4 garlic cloves, minced",
            "1/2 cup warm milk",
            "4 tablespoons butter",
            "1 teaspoon salt",
            "1/4 teaspoon black pepper",
            "2 tablespoons sour cream (optional)",
            "Chopped chives for garnish"
          ],
          steps: [
            "Boil potatoes and garlic in salted water until tender (15-20 min).",
            "Drain well and return to pot.",
            "Mash potatoes with milk, butter, salt, and pepper.",
            "Stir in sour cream if using.",
            "Garnish with chives before serving."
          ],
          tips: "For extra creamy potatoes, heat milk and butter together before adding.",
          nutrition: {
            calories: "180",
            protein: "4g",
            carbs: "27g",
            fat: "7g",
            fiber: "3g"
          }
        },
        {
          id: 22,
          name: "Roasted Potatoes",
          time: "50 min",
          difficulty: "Easy",
          servings: "6",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "2 lbs potatoes, cut into 1-inch cubes",
            "3 tablespoons olive oil",
            "1 teaspoon salt",
            "1/2 teaspoon black pepper",
            "1 teaspoon garlic powder",
            "1 teaspoon paprika",
            "1/2 teaspoon dried rosemary",
            "2 tablespoons fresh parsley, chopped"
          ],
          steps: [
            "Preheat oven to 425°F (220°C).",
            "Toss potatoes with oil and seasonings.",
            "Spread in single layer on baking sheet.",
            "Roast 40-45 min, flipping halfway, until crispy.",
            "Garnish with fresh parsley before serving."
          ],
          tips: "For crispier potatoes, soak in cold water for 30 min before roasting.",
          nutrition: {
            calories: "170",
            protein: "3g",
            carbs: "26g",
            fat: "7g",
            fiber: "3g"
          }
        },
        {
          id: 23,
          name: "Potato Soup",
          time: "40 min",
          difficulty: "Easy",
          servings: "6",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "6 cups potatoes, peeled and diced",
            "1 onion, chopped",
            "3 cups chicken or vegetable broth",
            "1 cup heavy cream",
            "3 tablespoons butter",
            "3 tablespoons flour",
            "1 teaspoon salt",
            "1/2 teaspoon black pepper",
            "1/2 teaspoon thyme",
            "Bacon bits and chives for garnish"
          ],
          steps: [
            "Cook potatoes and onion in broth until tender (15-20 min).",
            "Melt butter in separate pan, whisk in flour to make roux.",
            "Gradually whisk in 1 cup broth from potatoes.",
            "Add roux mixture back to soup pot.",
            "Stir in cream, salt, pepper, and thyme.",
            "Simmer 10 minutes.",
            "Garnish with bacon and chives."
          ],
          tips: "For thicker soup, mash some potatoes before adding cream.",
          nutrition: {
            calories: "280",
            protein: "5g",
            carbs: "30g",
            fat: "16g",
            fiber: "3g"
          }
        },
        {
          id: 24,
          name: "Potato Pancakes",
          time: "30 min",
          difficulty: "Medium",
          servings: "4",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "4 cups potatoes, grated and squeezed dry",
            "1 small onion, grated",
            "2 eggs, beaten",
            "1/4 cup flour",
            "1 teaspoon salt",
            "1/2 teaspoon black pepper",
            "Vegetable oil for frying",
            "Applesauce and sour cream for serving"
          ],
          steps: [
            "Mix potatoes, onion, eggs, flour, salt, and pepper.",
            "Heat 1/4 inch oil in skillet over medium-high heat.",
            "Drop 1/4 cup portions into hot oil, flatten slightly.",
            "Fry 3-4 min per side until golden brown.",
            "Drain on paper towels.",
            "Serve with applesauce and sour cream."
          ],
          tips: "Keep pancakes warm in 200°F (95°C) oven while frying batches.",
          nutrition: {
            calories: "220",
            protein: "6g",
            carbs: "35g",
            fat: "7g",
            fiber: "3g"
          }
        },
        {
          id: 25,
          name: "Scalloped Potatoes",
          time: "1 hr 30 min",
          difficulty: "Medium",
          servings: "8",
          youtubeLink: "https://www.youtube.com/watch?v=4uR1e8hQrZk",
          ingredients: [
            "3 lbs potatoes, thinly sliced",
            "3 cups shredded cheddar cheese",
            "1 onion, thinly sliced",
            "3 tablespoons butter",
            "3 tablespoons flour",
            "2 cups milk",
            "1 teaspoon salt",
            "1/2 teaspoon black pepper",
            "1/2 teaspoon paprika"
          ],
          steps: [
            "Preheat oven to 350°F (175°C).",
            "Layer half the potatoes and onions in greased 9x13 dish.",
            "Sprinkle with half the cheese.",
            "Repeat layers.",
            "Melt butter, whisk in flour to make roux.",
            "Gradually whisk in milk until thickened.",
            "Add salt and pepper, pour over potatoes.",
            "Sprinkle with paprika.",
            "Cover and bake 1 hour.",
            "Uncover and bake 15-20 min until golden."
          ],
          tips: "Let stand 10 minutes before serving for easier slicing.",
          nutrition: {
            calories: "320",
            protein: "12g",
            carbs: "35g",
            fat: "16g",
            fiber: "4g"
          }
        }
      ]
    }
  };

  const handleDetectFood = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockIngredients = [
        { name: "Onion", confidence: 92 },
        { name: "Carrot", confidence: 88 },
        { name: "Tomato", confidence: 85 },
        { name: "Spinach", confidence: 90 },
        { name: "Potato", confidence: 82 }
      ];
      setIngredients(mockIngredients);
      setIsLoading(false);
    }, 8000);
  };

  const handleManualAdd = () => {
    if (manualInput.trim() && !ingredients.some(i => i.name.toLowerCase() === manualInput.toLowerCase())) {
      setIngredients([...ingredients, { name: manualInput, confidence: 100 }]);
      setManualInput('');
    }
  };

  const handleRemoveIngredient = (ingredientName) => {
    setIngredients(ingredients.filter(i => i.name !== ingredientName));
  };

  const handleSaveRecipe = (recipe) => {
    if (!savedRecipes.some(r => r.id === recipe.id)) {
      setSavedRecipes([...savedRecipes, recipe]);
      alert('Recipe saved!');
    } else {
      alert('This recipe is already saved!');
    }
  };

  const handleRemoveSavedRecipe = (recipeId) => {
    setSavedRecipes(savedRecipes.filter(r => r.id !== recipeId));
  };

  const handleSubmitFeedback = () => {
    alert('Thank you for your feedback!');
    setFeedback('');
    setShowFeedbackForm(false);
  };

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIngredientSelect = (ingredientName) => {
    setSelectedIngredient(ingredientName);
    setSelectedRecipe(null);
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToIngredients = () => {
    setSelectedIngredient(null);
    setSelectedRecipe(null);
  };

  const handleBackToRecipes = () => {
    setSelectedRecipe(null);
  };

  // Helper functions
  const getIngredientIcon = (name) => {
    const icons = {
      broccoli: 'leaf',
      carrot: 'carrot',
      tomato: 'apple-alt',
      spinach: 'seedling',
      potato: 'utensils'
    };
    return icons[name.toLowerCase()] || 'carrot';
  };

  const getPrepTime = (name) => {
    const times = {
      broccoli: '10-20 min',
      carrot: '15-25 min',
      tomato: '5-15 min',
      spinach: '5-10 min',
      potato: '20-40 min'
    };
    return times[name.toLowerCase()] || '15 min';
  };

  const getCalories = (name) => {
    const calories = {
      broccoli: '55',
      carrot: '41',
      tomato: '22',
      spinach: '23',
      potato: '77'
    };
    return calories[name.toLowerCase()] || '50';
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Smart<span>Fridge</span> Recipes</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <nav className="nav-tabs">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            >
              <i className="fas fa-home"></i> Home
            </button>
            <button 
              onClick={() => setActiveTab('saved')} 
              className={`nav-btn ${activeTab === 'saved' ? 'active' : ''}`}
            >
              <i className="fas fa-bookmark"></i> Saved
            </button>
            <button 
              onClick={() => setActiveTab('about')} 
              className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            >
              <i className="fas fa-info-circle"></i> About
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'home' ? (
          <>
            {!selectedIngredient && !selectedRecipe && (
              <section className="detection-section">
                <WebcamCapture/>
                <div className="section-header">
                  <h2>Smart Fridge Recipe Finder</h2>
                  <p>Discover delicious recipes based on what's in your fridge</p>
                  <div className="action-buttons">
                    <button 
                      className="detect-btn" 
                      onClick={handleDetectFood} 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="btn-loader"></span>
                          Scanning...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-camera"></i> Scan Fridge
                        </>
                      )}
                    </button>
                    <div className="manual-entry">
                      <input
                        type="text"
                        placeholder="Enter ingredient manually"
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleManualAdd()}
                      />
                      <button className="manual-btn" onClick={handleManualAdd}>
                        <i className="fas fa-plus"></i> Add
                      </button>
                    </div>
                  </div>
                </div>

                {ingredients.length > 0 && (
                  <div className="ingredients-section">
                    <h3>Your Ingredients</h3>
                    <div className="ingredients-grid">
                      {filteredIngredients.map((item, index) => (
                        <div 
                          key={index}
                          className="ingredient-card"
                          onClick={() => handleIngredientSelect(item.name)}
                        >
                          <div className="ingredient-icon">
                            <i className={`fas fa-${getIngredientIcon(item.name)}`}></i>
                          </div>
                          <div className="ingredient-info">
                            <h4>{item.name}</h4>
                            {item.confidence && <div className="confidence-badge">{item.confidence}% match</div>}
                            <div className="quick-facts">
                              <span><i className="fas fa-clock"></i> {getPrepTime(item.name)}</span>
                              <span><i className="fas fa-fire"></i> {getCalories(item.name)} cal</span>
                            </div>
                          </div>
                          <button 
                            className="remove-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveIngredient(item.name);
                            }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {selectedIngredient && !selectedRecipe && (
              <div className="recipe-selection">
                <button className="back-btn" onClick={handleBackToIngredients}>
                  <i className="fas fa-arrow-left"></i> Back to ingredients
                </button>
                
                <div className="section-header">
                  <h2>Recipes with {selectedIngredient}</h2>
                  <p>{ingredientDatabase[selectedIngredient].description}</p>
                  <div className="ingredient-meta">
                    <span><strong>Storage:</strong> {ingredientDatabase[selectedIngredient].storageTips}</span>
                    <span><strong>Season:</strong> {ingredientDatabase[selectedIngredient].seasonality}</span>
                  </div>
                </div>

                <div className="recipes-grid">
                  {ingredientDatabase[selectedIngredient].recipes.map(recipe => (
                    <div 
                      key={recipe.id}
                      className="recipe-card"
                      onClick={() => handleRecipeSelect(recipe)}
                    >
                      <h3>{recipe.name}</h3>
                      <div className="recipe-meta">
                        <span><i className="far fa-clock"></i> {recipe.time}</span>
                        <span><i className="fas fa-signal"></i> {recipe.difficulty}</span>
                        <span><i className="fas fa-utensils"></i> {recipe.servings} servings</span>
                      </div>
                      <button 
                        className="save-recipe-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveRecipe(recipe);
                        }}
                      >
                        <i className="fas fa-bookmark"></i> Save
                      </button>
                    </div>
                  ))}
                </div>

                <div className="youtube-link-container">
                  <a 
                    href={ingredientDatabase[selectedIngredient].youtubeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="youtube-link"
                  >
                    <i className="fab fa-youtube"></i> Browse all {selectedIngredient} recipes on YouTube
                  </a>
                </div>
              </div>
            )}

            {selectedRecipe && (
              <div className="recipe-detail">
                <button className="back-btn" onClick={handleBackToRecipes}>
                  <i className="fas fa-arrow-left"></i> Back to recipes
                </button>

                <div className="recipe-header">
                  <h2>{selectedRecipe.name}</h2>
                  <div className="recipe-meta">
                    <span><i className="far fa-clock"></i> {selectedRecipe.time}</span>
                    <span><i className="fas fa-signal"></i> {selectedRecipe.difficulty}</span>
                    <span><i className="fas fa-utensils"></i> {selectedRecipe.servings} servings</span>
                  </div>
                  <button 
                    className="save-recipe-btn"
                    onClick={() => handleSaveRecipe(selectedRecipe)}
                  >
                    <i className="fas fa-bookmark"></i> Save Recipe
                  </button>
                </div>

                <div className="recipe-tabs">
                  <button className="tab-btn active">
                    Ingredients & Instructions
                  </button>
                </div>

                <div className="recipe-content">
                  <div className="ingredients-list">
                    <h3>Ingredients</h3>
                    <ul>
                      {selectedRecipe.ingredients.map((item, index) => (
                        <li key={index}>
                          <i className="fas fa-check-circle"></i> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="steps-list">
                    <h3>Cooking Instructions</h3>
                    <ol>
                      {selectedRecipe.steps.map((step, index) => (
                        <li key={index}>
                          <span className="step-number">{index + 1}.</span>
                          <span className="step-text">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="recipe-tips">
                    <h3>Chef's Tips</h3>
                    <p>{selectedRecipe.tips}</p>
                  </div>

                  <div className="nutrition-info">
                    <h3>Nutritional Information</h3>
                    <p>Per serving</p>
                    <div className="nutrition-grid">
                      <div className="nutrition-item">
                        <div className="nutrition-value">{selectedRecipe.nutrition.calories}</div>
                        <div className="nutrition-label">Calories</div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-value">{selectedRecipe.nutrition.protein}</div>
                        <div className="nutrition-label">Protein</div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-value">{selectedRecipe.nutrition.carbs}</div>
                        <div className="nutrition-label">Carbs</div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-value">{selectedRecipe.nutrition.fat}</div>
                        <div className="nutrition-label">Fat</div>
                      </div>
                      <div className="nutrition-item">
                        <div className="nutrition-value">{selectedRecipe.nutrition.fiber}</div>
                        <div className="nutrition-label">Fiber</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : activeTab === 'saved' ? (
          <div className="saved-recipes">
            <h2>Your Saved Recipes</h2>
            {savedRecipes.length > 0 ? (
              <div className="recipes-grid">
                {savedRecipes.map(recipe => (
                  <div 
                    key={recipe.id}
                    className="recipe-card"
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setActiveTab('home');
                    }}
                  >
                    <h3>{recipe.name}</h3>
                    <div className="recipe-meta">
                      <span><i className="far fa-clock"></i> {recipe.time}</span>
                      <span><i className="fas fa-signal"></i> {recipe.difficulty}</span>
                      <span><i className="fas fa-utensils"></i> {recipe.servings} servings</span>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSavedRecipe(recipe.id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-bookmark"></i>
                <p>No saved recipes yet</p>
                <button 
                  className="primary-btn"
                  onClick={() => setActiveTab('home')}
                >
                  Browse Recipes
                </button>
              </div>
            )}
          </div>
        ) : (
          <section className="about-section">
            <h2>About SmartFridge Recipes</h2>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-robot"></i>
                <h3>Smart Detection</h3>
                <p>Our AI identifies ingredients with 90%+ accuracy</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-utensils"></i>
                <h3>125+ Recipes</h3>
                <p>Curated collection from professional chefs</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-heart"></i>
                <h3>Healthy Choices</h3>
                <p>Nutritional info for every recipe</p>
              </div>
            </div>
            <button 
              className="feedback-btn"
              onClick={() => setShowFeedbackForm(!showFeedbackForm)}
            >
              <i className="fas fa-comment"></i> {showFeedbackForm ? 'Hide Feedback' : 'Give Feedback'}
            </button>
            {showFeedbackForm && (
              <div className="feedback-form">
                <textarea
                  placeholder="Share your thoughts about SmartFridge Recipes..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button onClick={handleSubmitFeedback}>Submit Feedback</button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="copyright">© 2025 SmartFridge Recipes. All rights reserved by <b>SANJITH</b>....</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
