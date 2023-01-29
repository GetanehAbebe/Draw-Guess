
export const SOCKET_URL = process.env.SOCKET_URL || "https://draw-guess-xoji.vercel.app";
export const COLOR_OPTIONS= ['Black','Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Brown',  'White', 'Gray', 'Maroon', 'Teal', 'Navy', 'Turquoise', 'Lavender', 'Beige', 'Crimson', 'Indigo', 'Gold'].map(item=>({name:item, value:item}))
export const  LINE_JOIN_OPTIONS = ["bevel", "miter", "round"].map(item=>({name:item, value:item}))
export const LEVEL_OPTIONS = ['Easy', 'Medium', 'Hard'].map(item=>({name:item, value:item}))