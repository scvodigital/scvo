// noinspection JSAnnotator
return {
  click: {
    preventDefault: true,
    tasks: [
      {
        type: "elementManipulator",
        config: { "<form": { addClass: "disabled" } }
      },
      {
        name: "submitRequest",
        type: "request",
        config: {
          url: { __template: "\{{{jquery rootElement 'attr' (split 'href')}}}" },
          method: "DELETE",
          dataType: "json"
        }
      },
      {
        type: "elementManipulator",
        config: {">": {attributes: {"data-errorhandler-target": "<form"}}}
      },
      "error-handler"
    ]
  }
}


