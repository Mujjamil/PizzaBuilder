export const signaturePizzas = [
  {
    id: 1,
    name: "Cheese Pizza Small",
    price: 100,
    tag: "bestseller",
    tagLabel: "⭐ Bestseller",
    description: "Plain Small Pizza Which You can Customize",
    image: "/cp.png",
    badges: ["S"],
  },
  {
    id: 2,
    name: "Cheese Pizza Medium",
    price: 160,
    tag: "bestseller",
    tagLabel: "⭐ Bestseller",
    description: "Plain Medium Pizza Which You can Customize",
    image: "/cp.png",
    badges: ["M"],
  },
  {
    id: 3,
    name: "Cheese Pizza large ",
    price: 210,
    tag: "bestseller",
    tagLabel: "⭐ Bestseller",
    description: "Plain Large Pizza Which You can Customize",
    image: "/cp.png",
    badges: ["L"],
  },
];

export const sizes = [
  { id: "10", label: '10"', basePrice: 999, inches: 10 },
  { id: "12", label: '12"', basePrice: 1249, inches: 12 },
  { id: "14", label: '14"', basePrice: 1499, inches: 14 },
];

export const crusts = [
  { id: "neapolitan", label: "Neapolitan", icon: "🍕", price: 0 },
  { id: "sicilian", label: "Sicilian", icon: "◻", price: 79 },
  { id: "thin", label: "Thin & Crispy", icon: "⬡", price: 0 },
  { id: "stuffed", label: "Stuffed Crust", icon: "⬤", price: 149 },
];

export const sauces = [
  { id: "tandoor", label: "Tandoori Sauce", color: "#8B1A1A", price: 30 },
  { id: "jalapeno", label: "Jalapeno Sauce", color: "#eebaf4ff", price: 40 },
  { id: "pizza", label: "Pizza Sauce", color: "#ec3755ff", price: 20 },
];

export const cheeses = [
  { id: "extracheese", label: "Extra Cheese", subtitle: "Extra ", price: 40 },
  { id: "cheeseburst", label: "Cheese Burst Layer", subtitle: "cheese Burst", price: 70 },
];

export const toppings = [
  { id: "onion", label: "Onion", price: 20, emoji: "🧅", category: "veggie" },
  { id: "capcicum", label: "Capcicum", price: 20, emoji: "🫑", category: "veggie" },
  { id: "tomato", label: "Tomato", price: 20, emoji: "🍅", category: "veggie" },
  { id: "sweet-corn", label: "Sweet Corn", price: 25, emoji: "🌽", category: "veggie" },
  { id: "jalapeno", label: "Jalapeno", price: 30, emoji: "🌶️", category: "premium" },
  { id: "black-olives", label: "Black Olives", price: 35, emoji: "🫒", category: "premium" },
  { id: "paneer-cubes", label: "Paneer Cubes", price: 40, emoji: "⚪", category: "veggie" },
  { id: "mushroom", label: "Mashroom", price: 35, emoji: "🍄", category: "premium" },
  { id: "tandoori-paneer", label: "Tandoori Paneer", price: 60, emoji: "🟠", category: "premium" },
  { id: "red-peprica", label: "Red Peprica", price: 30, emoji: "🌶️", category: "premium" },
  { id: "mix-veggies", label: "Mix veggie (Onion + Capsicum + Corn)", price: 40, emoji: "🧅🫑🌽", category: "veggie" },
];
