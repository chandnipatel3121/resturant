import grilledPaneerSteak from '../assets/dishes/grilled_paneer_steak.png';
import trufflePasta from '../assets/dishes/truffle_pasta.png';
import chocolateLavaCake from '../assets/dishes/chocolate_lava_cake.png';
import berryCheesecake from '../assets/dishes/berry_cheesecake.png';
import classicMargherita from '../assets/dishes/classic_margherita.png';
import chickenTikka from '../assets/dishes/chicken_tikka.png';
import dimSums from '../assets/dishes/dim_sums.png';
import sushiPlatter from '../assets/dishes/sushi_platter.png';
import spicyTacos from '../assets/dishes/spicy_tacos.png';
import padThaiNoodles from '../assets/dishes/pad_thai_noodles.png';
import mediterraneanMezze from '../assets/dishes/mediterranean_mezze.png';
import frenchRatatouille from '../assets/dishes/french_ratatouille.png';
import misoRamen from '../assets/dishes/miso_ramen.png';
import pancakesWithSyrup from '../assets/dishes/pancakes_with_syrup.png';

import gourmetSalad from '../assets/gourmet_salad.png';
import beeetrootsalad from '../assets/beeetrootsalad.jpg';
import shahipaneer from '../assets/shahipaneer.jpg';
import pasta3d from '../assets/pasta_3d.png';
import desert from '../assets/desert.jpg';
import italiancuisine from '../assets/italiancuisine.png';
import chiniescuisine from '../assets/chiniescuisine.png';
import falafel from '../assets/falafel.jpg';
import dish1 from '../assets/dish1.jpg';
import chinese from '../assets/chinese.jpg';
import punjabi from '../assets/punjabi.jpg';

const menuData = [
  {
    id: 1,
    title: "Grilled Paneer Steak",
    description: "Charred organic paneer steak steeped in stone-ground coastal spices and aromatic hill herbs, slow-grilled to caramelized perfection and laced with a velvety, rich saffron-infused cardamom cream sauce.",
    shortDescription: "Juicy charred paneer with aromatic herbs.",
    price: 320,
    cuisine: "Indian",
    course: "Main Course",
    diet: "Veg",
    mealTime: ["Lunch", "Dinner"],
    image: grilledPaneerSteak,
    images: [grilledPaneerSteak, shahipaneer, punjabi],
    spiceLevel: 2,
    prepTime: 15,
    serves: 1,
    origin: "Punjab, India",
    ingredients: ["Organic Paneer", "Fresh Cilantro", "Cardamom Cream", "Saffron Threads", "Garlic Butter", "Kashmiri Chili", "Charcoal Smoke"],
    cardBg: "#4a6e4a", // Vibrant Forest Green
    availability: "Available"
  },
  {
    id: 2,
    title: "Truffle Pasta",
    description: "Artisanal bronze-cut tagliatelle folded through a rich, velvety double-cream sauce, emulsified with wild forest mushrooms, aged Parmigiano-Reggiano, and topped with a lavish shaved winter black truffle tapenade.",
    shortDescription: "Creamy pasta with exotic truffle flavor.",
    price: 450,
    cuisine: "Italian",
    course: "Main Course",
    diet: "Veg",
    mealTime: ["Lunch", "Dinner"],
    image: trufflePasta,
    images: [trufflePasta, pasta3d, italiancuisine],
    spiceLevel: 1,
    prepTime: 20,
    serves: 1,
    origin: "Tuscany, Italy",
    ingredients: ["Tagliatelle Pasta", "Black Truffle Tapenade", "Parmigiano-Reggiano", "Wild Porcini", "Heavy Cream", "Fresh Thyme", "Extra Virgin Olive Oil"],
    cardBg: "#4a506e", // Vibrant Navy
    availability: "Available"
  },
  {
    id: 3,
    title: "Fresh Garden Salad",
    description: "A vibrant organic medley of crisp baby arugula, hand-picked romaine lettuce, heirloom cherry tomatoes, and sliced Greek Kalamata olives, tossed in a cold-pressed olive oil and sparkling Sicilian citrus vinaigrette.",
    shortDescription: "Freshly picked greens with a zingy twist.",
    price: 220,
    cuisine: "Continental",
    course: "Starter",
    diet: "Veg",
    mealTime: ["Breakfast", "Lunch"],
    image: gourmetSalad,
    images: [gourmetSalad, beeetrootsalad, gourmetSalad],
    spiceLevel: 0,
    prepTime: 10,
    serves: 2,
    origin: "Provence, France",
    ingredients: ["Baby Arugula", "Romaine Lettuce", "Heirloom Tomatoes", "Kalamata Olives", "Cold-Pressed Olive Oil", "Sicilian Lemon", "Toasted Pine Nuts"],
    cardBg: "#6e6e4a", // Vibrant Olive
    availability: "Available"
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    description: "A decadent dark cocoa warm cake with a molten, slow-oozing heart of finest Belgian chocolate. Served alongside a handcrafted scoop of Madagascan vanilla bean gelato and a fresh raspberry dust.",
    shortDescription: "Decadent melting chocolate heart.",
    price: 280,
    cuisine: "Continental",
    course: "Dessert",
    diet: "Veg",
    mealTime: ["Lunch", "Dinner"],
    image: chocolateLavaCake,
    images: [chocolateLavaCake, desert],
    spiceLevel: 0,
    prepTime: 12,
    serves: 1,
    origin: "Paris, France",
    ingredients: ["Belgian Cocoa", "Madagascar Vanilla", "Dark Chocolate Callets", "Organic Eggs", "Sweet Cream Butter", "Raspberry Coulis", "Gold Dust"],
    cardBg: "#6e4a4a", // Vibrant Maroon
    availability: "Limited"
  },
  {
    id: 5,
    title: "Classic Margherita",
    description: "Wood-fired sourdough base matured for 48 hours, topped with a rustic San Marzano tomato reduction, creamy Fior di Latte mozzarella, fragrant fresh sweet basil leaves, and a drizzle of premium extra virgin olive oil.",
    shortDescription: "Traditional Neapolitan basil & cheese pizza.",
    price: 350,
    cuisine: "Italian",
    course: "Main Course",
    diet: "Veg",
    mealTime: ["Lunch", "Dinner"],
    image: classicMargherita,
    images: [classicMargherita, pasta3d, italiancuisine],
    spiceLevel: 1,
    prepTime: 18,
    serves: 1,
    origin: "Naples, Italy",
    ingredients: ["Sourdough Base", "San Marzano Tomatoes", "Fior di Latte Mozzarella", "Sweet Basil", "Extra Virgin Olive Oil", "Sea Salt flakes"],
    cardBg: "#6e5a4a", // Vibrant Clay
    availability: "Available"
  },
  {
    id: 6,
    title: "Berry Cheesecake",
    description: "Rich, velvety Philadelphia cream cheese slow-baked on a buttery honey-graham cracker crust, finished with a luscious sweet-and-sour glaze of hand-picked wild forest blackberries and raspberries.",
    shortDescription: "Smooth cheesecake topped with wild berries.",
    price: 300,
    cuisine: "Continental",
    course: "Dessert",
    diet: "Veg",
    mealTime: ["Lunch", "Dinner"],
    image: berryCheesecake,
    images: [berryCheesecake, desert],
    spiceLevel: 0,
    prepTime: 8,
    serves: 1,
    origin: "New York, USA",
    ingredients: ["Philadelphia Cream Cheese", "Wild Blueberries", "Honey Graham Crust", "Fresh Raspberries", "Sweet Butter", "Vanilla Extract", "Sour Cream"],
    cardBg: "#6e4a5d", // Vibrant Plum
    availability: "Available"
  },
  {
    id: 7,
    title: "Chicken Tikka",
    description: "Tender boneless chicken thigh steeped in a traditional hung-yogurt marinade of red Kashmiri spices and fresh ginger-garlic paste, fire-roasted in a clay tandoor oven and served with zesty mint-coriander chutney.",
    shortDescription: "Tender grilled chicken with bold spices.",
    price: 380,
    cuisine: "Indian",
    course: "Starter",
    diet: "Non-Veg",
    mealTime: ["Lunch", "Dinner"],
    image: chickenTikka,
    images: [chickenTikka, punjabi],
    spiceLevel: 3,
    prepTime: 22,
    serves: 1,
    origin: "Delhi, India",
    ingredients: ["Tender Chicken Thighs", "Hung Yogurt", "Kashmiri Chili Powder", "Ginger-Garlic Paste", "Garam Masala", "Mint Leaves", "Coriander", "Fresh Lime"],
    cardBg: "#7d4a3a", // Vibrant Terracotta
    availability: "Available"
  },
  {
    id: 8,
    title: "Dim Sums",
    description: "Delicate wheat-starch wrappers hand-folded around a savory, steaming minced seasoned seasonal cabbage, crisp bamboo shoots, and fresh wild shiitake mushrooms, served with house black-bean chili oil.",
    shortDescription: "Authentic steamed parcels of flavor.",
    price: 240,
    cuisine: "Chinese",
    course: "Starter",
    diet: "Veg",
    mealTime: ["Lunch", "Dinner"],
    image: dimSums,
    images: [dimSums, chiniescuisine, chinese],
    spiceLevel: 1,
    prepTime: 15,
    serves: 2,
    origin: "Guangdong, China",
    ingredients: ["Wheat Starch Wrappers", "Shiitake Mushrooms", "Savory Cabbage", "Bamboo Shoots", "Fresh Ginger", "Scallions", "Black Bean Chili Oil"],
    cardBg: "#4a6e5d", // Vibrant Teal
    availability: "Available"
  },
  {
    id: 9,
    title: "Pancakes with Syrup",
    description: "Light and golden griddled buttermilk pancakes stacked tall and finished with a rich pat of grass-fed salted butter, fresh organic blueberries, and a generous pour of dark maple syrup.",
    shortDescription: "Classic morning breakfast delight.",
    price: 180,
    cuisine: "Continental",
    course: "Main Course",
    diet: "Veg",
    mealTime: ["Breakfast"],
    image: pancakesWithSyrup,
    images: [pancakesWithSyrup, desert],
    spiceLevel: 0,
    prepTime: 12,
    serves: 2,
    origin: "London, UK",
    ingredients: ["Buttermilk Batter", "Organic Blueberries", "Pure Maple Syrup", "Salted Grass-fed Butter", "Powdered Sugar", "Fresh Mint"],
    cardBg: "#6e664a", // Vibrant Bronze
    availability: "Breakfast Only"
  },
  {
    id: 10,
    title: "Sushi Platter",
    description: "An exquisite hand-crafted selection of fresh Norwegian salmon sashimi, line-caught yellowfin tuna nigiri, and California crab avocado rolls, accompanied by pickled ginger, wasabi root, and naturally brewed soy sauce.",
    shortDescription: "Hand-rolled sushi with finest fish.",
    price: 850,
    cuisine: "Japanese",
    course: "Main Course",
    diet: "Non-Veg",
    mealTime: ["Lunch", "Dinner"],
    image: sushiPlatter,
    images: [sushiPlatter, dish1],
    spiceLevel: 0,
    prepTime: 25,
    serves: 2,
    origin: "Tokyo, Japan",
    ingredients: ["Norwegian Salmon", "Yellowfin Tuna", "Vinegared Sushi Rice", "Avocado", "Nori Sheets", "Pickled Ginger", "Wasabi Root", "Artisanal Soy Sauce"],
    cardBg: "#4a4a6e", // Vibrant Midnight
    availability: "Available"
  },
  {
    id: 11,
    title: "Spicy Tacos",
    description: "Crispy hand-pressed corn tortilla shells packed with slow-cooked shredded flank beef barbacoa, fresh avocado cubes, pickled red onion, and topped with a zesty, fire-roasted tomato and jalapeño salsa.",
    shortDescription: "Zesty Mexican street food classic.",
    price: 340,
    cuisine: "Mexican",
    course: "Main Course",
    diet: "Non-Veg",
    mealTime: ["Lunch", "Dinner"],
    image: spicyTacos,
    images: [spicyTacos, dish1],
    spiceLevel: 3,
    prepTime: 15,
    serves: 2,
    origin: "Jalisco, Mexico",
    ingredients: ["Corn Tortillas", "Beef Barbacoa", "Fresh Avocado", "Pickled Red Onion", "Fire-Roasted Tomato Salsa", "Jalapeño", "Cilantro", "Cotija Cheese"],
    cardBg: "#7d3a3a", // Vibrant Crimson
    availability: "Available"
  },
  {
    id: 12,
    title: "Pad Thai Noodles",
    description: "Traditional flat rice noodles stir-fried in a roaring hot wok with sweet-and-sour tamarind reduction, crispy tofu cubes, organic bean sprouts, Chinese chives, crushed roasted peanuts, and fresh lime.",
    shortDescription: "Authentic Thai street noodles.",
    price: 420,
    cuisine: "Thai",
    course: "Main Course",
    diet: "Veg",
    mealTime: ["Lunch", "Dinner"],
    image: padThaiNoodles,
    images: [padThaiNoodles, chinese, chiniescuisine],
    spiceLevel: 2,
    prepTime: 18,
    serves: 1,
    origin: "Bangkok, Thailand",
    ingredients: ["Flat Rice Noodles", "Tamarind Reduction", "Organic Tofu Cubes", "Fresh Bean Sprouts", "Chinese Chives", "Crushed Peanuts", "Fresh Lime juice"],
    cardBg: "#6e504a", // Vibrant Umber
    availability: "Available"
  },
  {
    id: 13,
    title: "Mediterranean Mezze",
    description: "An absolute showcase of flavors featuring house-pureed creamy chickpea hummus, crispy herbed chickpea falafels, smoked eggplant mutabbal, warm hand-stretched pita bread, and stuffed grape leaves.",
    shortDescription: "Traditional Middle Eastern appetizer tray.",
    price: 480,
    cuisine: "Mediterranean",
    course: "Starter",
    diet: "Veg",
    mealTime: ["Lunch", "Dinner"],
    image: mediterraneanMezze,
    images: [mediterraneanMezze, falafel],
    spiceLevel: 1,
    prepTime: 15,
    serves: 2,
    origin: "Beirut, Lebanon",
    ingredients: ["Chickpeas", "Tahini Paste", "Falafel Herbs", "Eggplant", "Grape Leaves", "Warm Pita", "Extra Virgin Olive Oil", "Sumac Spice"],
    cardBg: "#4a5a6e", // Vibrant Slate
    availability: "Available"
  },
  {
    id: 14,
    title: "French Ratatouille",
    description: "A beautiful rustic Provencal classic of thinly sliced organic eggplant, green zucchini, yellow summer squash, and red bell peppers slow-braised in a herbed tomato and garlic reduction sauce.",
    shortDescription: "Rustic Provencal vegetable medley.",
    price: 520,
    cuisine: "French",
    course: "Main Course",
    diet: "Veg",
    mealTime: ["Dinner"],
    image: frenchRatatouille,
    images: [frenchRatatouille, gourmetSalad, beeetrootsalad],
    spiceLevel: 1,
    prepTime: 35,
    serves: 1,
    origin: "Nice, France",
    ingredients: ["Italian Eggplant", "Zucchini", "Yellow Squash", "Red Bell Pepper", "San Marzano Base", "Fresh Rosemary", "Thyme", "Garlic cloves"],
    cardBg: "#6e4a4a", // Vibrant Wine
    availability: "Available"
  },
  {
    id: 15,
    title: "Miso Ramen",
    description: "A deeply comforting miso and dashi broth simmered for 12 hours, served with fresh ramen wheat noodles, tender rolled chashu, marinated soft-boiled egg, fresh bamboo shoots, and green spring onions.",
    shortDescription: "Hearty Japanese noodle soup.",
    price: 580,
    cuisine: "Japanese",
    course: "Main Course",
    diet: "Non-Veg",
    mealTime: ["Lunch", "Dinner"],
    image: misoRamen,
    images: [misoRamen, chinese],
    spiceLevel: 2,
    prepTime: 20,
    serves: 1,
    origin: "Hokkaido, Japan",
    ingredients: ["Red Miso Paste", "Dashi Broth", "Wheat Ramen Noodles", "Chashu Pork", "Marinated Egg", "Bamboo Shoots", "Green Spring Onions", "Nori strip"],
    cardBg: "#6e6e4a", // Vibrant Earth
    availability: "Available"
  }
];

export default menuData;
