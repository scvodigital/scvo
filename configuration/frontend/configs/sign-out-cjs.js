return {
  click: {
    tasks: [
      {
        type: "firebaseSignOut",
        config: {}
      },
      {
        type: "run",
        config: { code: 'window.location.href = "/jobs/community-jobs-scotland/vacancies/sign-in"' }
      }
    ]
  }
}