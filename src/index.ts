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
export async function queryFontList(): Promise<FontData[]> {
  return await window.queryLocalFonts()
}

/**
 * Query target local font blob
 * @param postscriptName font postscript name
 */
export async function queryTargetFontBlob(postscriptName: string): Promise<Blob | null> {
  const [font] = await window.queryLocalFonts({
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

  let face
  switch (true) {
    case style.includes('thin'):
      face = 100
      break
    case style.includes('extralight'):
      face = 200
      break
    case style.includes('light'):
      face = 300
      break
    case style.includes('medium'):
      face = 500
      break
    case style.includes('semibold'):
      face = 600
      break
    case style.includes('extrabold'):
      face = 800
      break
    case style.includes('black'):
    case style.includes('ultrabold'):
      face = 900
      break
    case style.includes('bold'):
      face = 700
      break
    default:
      face = 400
  }

  return face
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
