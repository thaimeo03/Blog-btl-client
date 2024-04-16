export interface IGeminiContent {
  contents: [
    {
      parts: [
        {
          text: string
        }
      ]
    }
  ]
}

export interface IGeminiResponse {
  candidates: [
    {
      content: {
        parts: [
          {
            text: string
          }
        ]
      }
    }
  ]
}
