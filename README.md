## local-font

wrapper of experimental [queryLocalFonts](https://developer.mozilla.org/en-US/docs/Web/API/Window/queryLocalFonts) API

[caniuse](https://caniuse.com/?search=querylocal)

### utils

```ts
import {
  isSupportQueryLocalFonts,
  queryFontList,
  queryTargetFontBlob,
} from 'local-font'

if (isSupportQueryLocalFonts()) {
  await queryFontList() // ==> FontData[]
  await queryTargetFontBlob('ComicSansMS') // ==> Blob
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