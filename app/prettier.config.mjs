/** @type {import("prettier").Config} */
const prettierConfig = {
  printWidth: 100,
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/components/(.*)$", "^@/app/(.*)$", "^[./]"],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default prettierConfig;
