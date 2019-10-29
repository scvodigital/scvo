return {
  submit: {
    preventDefault: true,
    tasks: [
      {
        type: "elementManipulator",
        config: { ">": { addClass: "disabled" } }
      },
      {
        name: "submitRequest",
        type: "request",
        config: {
          url: { __template: "\{{{jquery rootElement 'attr' (split 'action')}}}" },
          method: { __template: "\{{coalesce (jquery rootElement 'attr' (split 'method')) 'POST'}}" },
          dataType: "json",
          data: {
            __template: `\{{{json value=(parse (jquery null "serialize" context=metadata.instance.element) type="querystring")}}}`,
            __parser: "json"
          }
        }
      },
      {
        type: "elementManipulator",
        config: {">": {attributes: {"data-errorhandler-target": ">"}}}
      },
      "error-handler"
    ]
  }
}


