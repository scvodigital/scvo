return {
  click: {
    __doNotCompile: true,
    preventDefault: true,
    tasks: [
      {
        type: "elementManipulator",
        config: {
          "< | $": { removeClass: "active" },
          "<": { addClass: "active" },
          "<.tabs | .panel": { styles: { display: "none" } },
          "{href}": { styles: { display: "block" } }
        }
      }
    ]
  }
}