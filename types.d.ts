declare interface Window {
  /**
   * query local fonts
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/queryLocalFonts MDN Document}
   */
  queryLocalFonts: (
    options?: { postscriptNames: string[] }
  ) => Promise<FontData[]>
}

declare interface FontData {
  readonly family:string
  readonly fullName: string
  readonly postscriptName: string
  readonly style: string
  readonly blob: () => Promise<Blob>
}