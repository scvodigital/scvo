return {
  click: {
    tasks: [
      {
        type: "firebaseSignOut",
        config: {}
      },
      {
        type: "run",
        config: { code: 'window.location.href = "/jobs/employability-support/vacancies/sign-in"' }
      }
    ]
  }
}