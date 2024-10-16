export function m(t: string, args: (string | number | undefined)[]) {
  let result = t
  args.forEach((arg, i) => {
    if (arg !== undefined) {
      result = result.replace(`{${i}}`, String(arg))
    }
  })
  return result
}
