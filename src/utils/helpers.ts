export const selectDefaultPath = (path: string) => {
  switch (path) {
    case "/": {
      return "g1"
    }
    case "/favorites": {
      return "g2"
    }
    case "/rated": {
      return "g3"
    }
    default: {
      return "g1"
    }
  }
}
