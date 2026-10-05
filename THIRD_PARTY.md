# Third-party notices

Astronomy Engine — Don Cross — MIT

Upstream: https://github.com/cosinekitty/astronomy

Source: https://raw.githubusercontent.com/cosinekitty/astronomy/master/source/js/astronomy.browser.min.js

Retrieved 2026-10-05. Vendored unchanged; no runtime network required.

SHA256: `d1b3ab4b86aa409f78c0f0d95162a847496cba7e938eb6f4712cf9c1c45f4a2e`

License: dist/vendor/LICENSE.txt

## D3-Celestial name data

Copyright (c) 2015 Olaf Frohn. BSD-3-Clause, retained in dist/vendor/d3-celestial-LICENSE.txt.

Selected name fields adapted from https://github.com/ofrohn/d3-celestial/blob/master/data/starnames.json and https://github.com/ofrohn/d3-celestial/blob/master/data/starnames.cn.json on 2026-10-05. HIP IDs retain mapping provenance. Chinese asterism labels are normalized from the corresponding names. This is a selected modern compilation, not a reconstruction of one historical epoch.

## Expanded bright-star subset

`dist/bright-stars.js` adapts 519 records with catalog apparent magnitude <=4.0 from D3-Celestial `stars.6.json`, with names and constellation translations from the companion name tables and `constellations.json`. D3-Celestial credits XHIP: Anderson & Francis (2012), VizieR V/137D, for stellar data. Source: https://cdsarc.cds.unistra.fr/viz-bin/cat/V/137D . The upstream BSD-3-Clause notice is retained. Source hashes are in dist/catalog-provenance.json. Catalog magnitudes are static, not live measurements.
