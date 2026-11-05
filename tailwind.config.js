module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}"], // Define which files to be updated by tailwind
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}