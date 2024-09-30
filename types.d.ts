declare interface Window {
  /**
   * Query local fonts
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/queryLocalFonts MDN Reference}
   */
  queryLocalFonts: (
    options?: { postscriptNames: string[] }
  ) => Promise<FontData[]>
}

declare interface FontData {
  /**
   * The family of the font face
   */
  readonly family: string
  /**
   * The full name of the font face
   */
  readonly fullName: string
  /**
   * The PostScript name of the font face
   */
  readonly postscriptName: string
  /**
   * The style of the font face
   */
  readonly style: string
  /**
   * Get a Promise that fulfills with a Blob containing the raw bytes of the underlying font file
   */
  readonly blob: () => Promise<Blob>
}
