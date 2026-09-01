export const correctMessages = [
  "Nice.",
  "Okay, that was good.",
  "You're getting suspiciously good at this.",
  "Your photo survives another round.",
  "Not bad 👀",
];

export const wrongMessagesFirst = [
  "Wrong tile 😌",
  "Well... now you've revealed me instead.",
  "Bold choice.",
  "That tile was innocent.",
  "Plot twist: that's me.",
];

export const wrongMessageSecond = "One life left.\nPressure looks good on you.";
export const wrongMessageThird = "Careful. You're running out of hearts.";

export const invalidKeyMessages = [
  "Nice try.",
  "That would've been too easy.",
  "Incorrect key 😌",
  "You really thought I'd make it that simple?",
  "Nope. Ask nicely.",
];

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
