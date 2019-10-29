return {
  change: {
    tasks: [
      {
        type: "run",
        config: { code: "window.formHasChanged = true" }
      }
    ]
  },
  keypress: {
    preventDefault: "\{{#eq metadata.event.which '13'}}true\{{else}}false\{{/eq}}",
    tasks: [
      {
        type: "switch",
        config: {
          which: { __template: "\{{#eq metadata.event.which '13'}}enter\{{/eq}}" },
          branches: {
            default: {},
            enter: {
              tasks: [
                {
                  name: "selector",
                  type: "basic",
                  config: { __template: "a:not([disabled]):visible, button:not([disabled]):visible, input:not([disabled]):visible, select:not([disabled]):visible, textarea:not([disabled]):visible, [tabindex]:visible:not([disabled]):not([tabindex='-1'])" }
                },
                {
                  name: "nextElement",
                  type: "run",
                  config: { code: "$(data.selector).eq($(data.selector).index(rootElement) + 1)" }
                },
                {
                  type: "run",
                  config: { code: "['BUTTON', 'A'].indexOf(data.nextElement.prop('tagName')) > -1 ? data.nextElement.click() : data.nextElement.focus()" }
                }
              ]
            }
          }
        }
      }
    ]
  }
}