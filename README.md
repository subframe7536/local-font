## local-font

wrapper of experimental [queryLocalFonts](https://developer.mozilla.org/en-US/docs/Web/API/Window/queryLocalFonts) API

[caniuse](https://caniuse.com/?search=querylocal)

### utils

```ts
import {
  checkLocalFontPermission,
  fontWeightLabels,
  isMonospace,
  isSupportQueryLocalFonts,
  parseFontStyleToWeight,
  queryFontList,
  queryTargetFontBlob
} from 'local-font'

if (isSupportQueryLocalFonts() && (await checkLocalFontPermission()).state === 'granted') {
  const data = await queryFontList() // ==> FontData[]
  await queryTargetFontBlob('ComicSansMS') // ==> Blob | null

  const ctx = document.createElement('canvas').getContext('2d')!
  isMonospace(ctx, data[0].family) // `true` or `false`
  fontWeightLabels[parseFontStyleToWeight(data[0].style)] // Regular
}
```

### typescript support

in tsconfig.json:

```json
{
  "compilerOptions": {
    "types": [
      "local-font/types"
    ]
  }
}
```
