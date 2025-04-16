import { Extension } from "@tiptap/core"
import { v4 as uuidv4 } from "uuid"

const ParagraphMeta = Extension.create({
  name: "paragraphMeta",

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          id: {
            default: null,
            parseHTML: element => element.getAttribute("data-id"),
            renderHTML: attributes => {
              if (!attributes.id) {
                return {}
              }
              return {
                "data-id": attributes.id,
              }
            },
          },
          time: {
            default: null,
            parseHTML: element => element.getAttribute("data-time"),
            renderHTML: attributes => {
              if (!attributes.time) {
                return {}
              }
              return {
                "data-time": attributes.time,
              }
            },
          },
        },
      },
    ]
  },

  onCreate() {
    this.editor.commands.setContent(this.editor.getJSON(), false)
  },

  onUpdate() {
    const { state, commands } = this.editor
    const json = this.editor.getJSON()
    const updated = json.content.map(block => {
      if (block.type === "paragraph" || block.type === "heading") {
        if (!block.attrs) block.attrs = {}
        if (!block.attrs.id) block.attrs.id = uuidv4()
        block.attrs.time = new Date().toISOString()
      }
      return block
    })

    commands.setContent({
      type: 'doc',
      content: updated,
    }, false)
  },
})
export default ParagraphMeta;