return  {
  type: "multiTask",
  config: {
    tasks: [
      {
        __doNotCompile: true,
        type: "switch",
        config: {
          which: { __template: `\{{#eq (jquery '#change-password-value' 'val') (jquery '#change-password-confirm' 'val')}}default\{{else}}error\{{/eq}}` },
          branches: {
            default: {
              tasks: [
                {
                  type: "run",
                  config: { code: "$('#change-password-confirm')[0].setCustomValidity('');" }
                }
              ]
            },
            error: {
              tasks: [
                {
                  type: "run",
                  config: { code: "$('#change-password-confirm')[0].setCustomValidity('The password and confirm fields do not match');" }
                }
              ]
            }
          }
        }
      },
      {
        name: "isFormValid",
        type: "call",
        config: {
          owner: {
            type: "HTMLElement",
            selector: ">"
          },
          functionName: "checkValidity"
        }
      },
      {
        __doNotCompile: true,
        type: "elementManipulator",
        config: {
          ">button": {
            attributes: {
              disabled: {
                __template: `
                  {{~#if data.isFormValid~}}
                    null
                  {{~else~}}
                    "disabled"
                  {{~/if~}}
                `,
                __parser: "json"
              }
            }
          }
        }
      }
    ]
  }
}
