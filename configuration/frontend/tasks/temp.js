return {
  type: "multiTask",
  config: {
    tasks: [
      {
        name: "showform",
        type: "elementManipulator",
        config: {"{data-target}" : {removeClass: "disabled"}}
      },
      {
        name: "toast",
        type: "basic",
        config: {
          message: {__template: "my things: {{json value=data.errorInfo}}" },
          class: "error"
        }
      },
      "toast"
    ]
  }
}