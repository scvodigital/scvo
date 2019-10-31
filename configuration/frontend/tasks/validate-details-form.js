return  {
    type: "multiTask",
    config: {
      tasks: [
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
            "#detail-submit": {
              attributes: {
                disabled: {
                  __template: `
                  {{~#ifAll (jquery '#local_authority' 'val') data.isFormValid~}}
                    null
                  {{~else~}}
                    "disabled"
                  {{~/ifAll~}}
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
