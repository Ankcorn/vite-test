import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { parse } from "acorn";
import { generate } from "escodegen";
function plugin() {
  return {
    name: "vite:serverlessLoader",
    transform(src, id) {
      const file = path.parse(id);
      if (
        file.dir.includes(path.join(__dirname, "src")) &&
        file.ext === ".jsx"
      ) {
        console.log(id);
        console.log("-----");
        console.log(src);
        const ast = parse(src, {
          sourceType: "module",
          ecmaVersion: "latest",
        });

        const exportedMembers = ast.body.filter(
          (node) => node.type === "ExportNamedDeclaration"
        );
        const loaderFunction = exportedMembers.find(
          (el) => el.declaration.id.name === "loader"
        );

        console.log(loaderFunction);
        if (loaderFunction) {
          console.log(generate(loaderFunction));
          const newBody = ast.body.filter(
            (node) =>
              node.start !== loaderFunction.start &&
              node.end !== loaderFunction.end
          );
          ast.body = newBody;
          console.log(generate(ast));
        }
      }
    },
  };
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), plugin()],
});
