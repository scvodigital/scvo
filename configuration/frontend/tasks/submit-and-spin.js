return {
  type: "multiTask",
  config: {
    tasks: [
      {
        type: "elementManipulator",
        config: {
          ">": {addClass: "disabled"}
        }
      },
      {
        type: "run",
        config: { code: "window.formHasChanged = false" }
      }
    ]
  }
}
