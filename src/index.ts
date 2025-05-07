export interface FontData {
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

/**
 * Check if support query local fonts
 */
export function isSupportQueryLocalFonts(): boolean {
  return 'queryLocalFonts' in window
}

export async function checkLocalFontPermission(): Promise<PermissionStatus> {
  return navigator.permissions.query(
    { name: 'local-fonts' as PermissionName } satisfies PermissionDescriptor,
  )
}

/**
 * Query local font list
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/queryLocalFonts MDN Reference}
 */
export async function queryFontList(options?: { postscriptNames: string[] }): Promise<FontData[]> {
  return window.queryLocalFonts(options)
}

/**
 * Query target local font blob
 * @param postscriptName font postscript name
 */
export async function queryTargetFontBlob(postscriptName: string): Promise<Blob | null> {
  const [font] = await queryFontList({
    postscriptNames: [postscriptName],
  })
  return font ? await font.blob() : null
}

export function isMonospace(ctx: CanvasRenderingContext2D, fontName: string): boolean {
  const count = (char: string): number => ctx.measureText(char).width
  ctx.font = `16px ${fontName}`
  return count('i') === count('M') && count('|') === count('%')
}

export function parseFontStyleToWeight(style: string): number {
  style = style.toLowerCase().replace(/[\s\-_]/g, '')

  switch (true) {
    case style.includes('thin'):
      return 100
    case style.includes('extralight'):
      return 200
    case style.includes('light'):
      return 300
    case style.includes('medium'):
      return 500
    case style.includes('semibold'):
      return 600
    case style.includes('extrabold'):
      return 800
    case style.includes('black'):
    case style.includes('ultrabold'):
      return 900
    case style.includes('bold'):
      return 700
    default:
      return 400
  }
}

export const fontWeightLabels: Record<number, string> = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
}
