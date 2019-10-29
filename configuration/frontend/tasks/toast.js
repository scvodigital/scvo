return {
  type: "multiTask",
  config: {
    tasks: [
      {
        type: "elementManipulator",
        __doNotCompile : true,
        config: {
          "#toaster": {
            createElement: {
              html: {
                __template: `
                  <div class="toast toast-{{coalesce data.toast.class "primary"}} toast-in" data-component="TasksTrigger" data-TasksTrigger='{
                    mouseover: {
                      tasks: [
                        {
                          type: "elementManipulator",
                          config: { ">": { addClass: "toast-hovered", removeClass: [ "toast-in", "toast-out"] } }
                        }
                      ]
                    },
                    mouseout: {
                      tasks: [
                        {
                          type: "elementManipulator",
                          config: { ">": { addClass: "toast-out", removeClass: [ "toast-hovered", "toast-in" ] } }
                        }
                      ]
                    }
                  }'>
                    <button class="btn btn-clear float-right" data-component="TasksTrigger" data-TasksTrigger='{
                      click: {
                        tasks: [
                          {
                            type: "elementManipulator",
                            config: { "<.toast": { addClass: "toast-closed" } }
                          }
                        ]
                      }
                    }'></button>
                    {{{coalesce data.toast.message "No message provided"}}}
                  </div>
                `
              }
            }
          }
        }
      },
      {
        type: "run",
        config: { code: "ComponentManager.requestUpdate()" }
      }
    ]
  }
}