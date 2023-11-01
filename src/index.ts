/// <reference types="../types.d.ts" />

/**
 * check if support query local fonts
 */
export function isSupportQueryLocalFonts() {
  return 'queryLocalFonts' in globalThis
}

/**
 * query local font list
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/queryLocalFonts MDN Document}
 */
export async function queryFontList(): Promise<FontData[]> {
  return await window.queryLocalFonts()
}

/**
 * query target local font blob
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/queryLocalFonts#accessing_low-level_data MDN Example}
 */
export async function queryTargetFontBlob(postscriptName: string | string[]): Promise<Blob | Error> {
  const fonts = await window.queryLocalFonts({
    postscriptNames: Array.isArray(postscriptName) ? postscriptName : [postscriptName],
  })
  return await fonts[0].blob()
}