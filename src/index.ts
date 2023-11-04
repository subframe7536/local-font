/// <reference types="../types.d.ts" />

export interface FontData {
  /**
   * the family of the font face
   */
  readonly family: string
  /**
   * the full name of the font face
   */
  readonly fullName: string
  /**
   * the PostScript name of the font face
   */
  readonly postscriptName: string
  /**
   * the style of the font face
   */
  readonly style: string
  /**
   * get a Promise that fulfills with a Blob containing the raw bytes of the underlying font file
   */
  readonly blob: () => Promise<Blob>
}

/**
 * check if support query local fonts
 */
export function isSupportQueryLocalFonts() {
  return 'queryLocalFonts' in globalThis
}

/**
 * query local font list
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/queryLocalFonts MDN Reference}
 */
export async function queryFontList(): Promise<FontData[]> {
  return await window.queryLocalFonts()
}

/**
 * query target local font blob
 * @param postscriptName font postscript name
 */
export async function queryTargetFontBlob(postscriptName: string): Promise<Blob> {
  const [font] = await window.queryLocalFonts({
    postscriptNames: [postscriptName],
  })
  return await font.blob()
}