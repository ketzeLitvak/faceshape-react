export function APIReference() {
  return (
    <section id="docs-api">
      <h2>Character reference</h2>
      <div className="docs-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Usage and default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>face</code>
              </td>
              <td>
                Required. Complete eyes, mouth and eyebrow configuration. Each part
                supports none.
              </td>
            </tr>
            <tr>
              <td>
                <code>shape</code>
              </td>
              <td>
                circle, blob, square, star, triangle or a custom definition. Default:
                blob.
              </td>
            </tr>
            <tr>
              <td>
                <code>expression</code>
              </td>
              <td>Emotion name or custom geometry. Default: neutral.</td>
            </tr>
            <tr>
              <td>
                <code>name</code>
              </td>
              <td>
                Optional deterministic identity. Takes precedence over the deprecated seed
                alias.
              </td>
            </tr>
            <tr>
              <td>
                <code>color / faceColor</code>
              </td>
              <td>
                Body and face colors. Without a name or color, body: #388697; face:
                #182b35. Beaks and cheeks retain their own colors.
              </td>
            </tr>
            <tr>
              <td>
                <code>size</code>
              </td>
              <td>
                Number or CSS size. Default: 160. SVG width and height attributes can
                override it.
              </td>
            </tr>
            <tr>
              <td>
                <code>faceBox</code>
              </td>
              <td>
                Overrides the face area in the shape definition. Values normalized from 0
                to 1.
              </td>
            </tr>
            <tr>
              <td>
                <code>motion</code>
              </td>
              <td>Motion options; all disabled when omitted.</td>
            </tr>
            <tr>
              <td>
                <code>transition</code>
              </td>
              <td>
                duration in milliseconds, default 300. easing: linear, ease-out (default)
                or ease-in-out.
              </td>
            </tr>
            <tr>
              <td>
                <code>reducedMotion</code>
              </td>
              <td>Explicitly stops motion. The system preference is also respected.</td>
            </tr>
            <tr>
              <td>
                <code>label, ARIA and SVG</code>
              </td>
              <td>
                Accessible label, SVG attributes, styles and a ref to the SVG element.
              </td>
            </tr>
            <tr>
              <td>
                <code>children</code>
              </td>
              <td>Replaces the automatic face for custom composition.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
