import { Mark, mergeAttributes } from "@tiptap/core";

const Textsize = Mark.create({
  name: "Textsize",

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          return {
            style: `font-size: ${attributes.size}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ style: "font-size" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setTextSize:
        size =>
        ({ commands }) => {
          return commands.setMark("Textsize", { size });
        },
      unsetTextSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark("Textsize");
        },
    };
  },
});

export default Textsize;
