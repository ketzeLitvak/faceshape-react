import { CodeBlock } from '../../CodeBlock';
import { identityExample } from '../../examples.en';

export function Identity() {
  return (
    <section id="docs-identity">
      <h2>One name, one identity</h2>
      <p>
        <code>name</code> determines color, facial traits and supported shape proportions.
        The same name and shape reproduce the same result. You do not need to save random
        values.
      </p>
      <p>
        <code>fish</code> combines five fish species and four shark silhouettes.{' '}
        <code>shark</code> selects only sharks. Both vary deterministically by name and
        support a fixed color.
      </p>
      <CodeBlock code={identityExample} />
      <p>
        Setting <code>color</code> keeps silhouette variation. Blobs change their outline;
        circles and stars change size; squares and triangles change size and rotation
        while the face stays upright. The legacy <code>seed</code> alias is supported, but
        prefer <code>name</code>.
      </p>
      <div className="docs-note">
        <strong>Additional library shapes</strong>
        <p>
          Import heart, fish, shark, penguin, device and the other additional shapes from{' '}
          <code>faceshape-react/shapes</code>. Pass the definition to{' '}
          <code>Character</code> using <code>shape</code>. These are library definitions,
          not built-in string names.
        </p>
      </div>
      <h3>Variation by shape</h3>
      <p>
        Planets vary rings and zero to two moons. Robots vary proportions, zero to two
        antennas and side modules. Cats keep a fixed circular head and ears; only color
        changes. Flowers vary petal count and geometry. Devices choose desktop, notebook,
        phone or tablet. Drops and toast vary proportions. Ghosts choose classic, wide,
        sheet, dripping or side-tail profiles. Clouds vary their lobes. The same name
        always reproduces the same appearance; <code>color</code> overrides automatic
        color.
      </p>
      <h3>Readable text colors</h3>
      <p>
        Import <code>textColorFromName</code> from <code>faceshape-react/core</code> and
        call <code>textColorFromName('Ketze', '#ffffff')</code>. It keeps the name color
        when contrast is sufficient; otherwise it lightens or darkens it to reach 4.5:1
        against that background. It accepts opaque <code>#RGB</code> or{' '}
        <code>#RRGGBB</code> backgrounds and returns a hex color.{' '}
        <code>colorFromName</code> and the character color stay unchanged. Recompute the
        text color when the theme changes its background.
      </p>
    </section>
  );
}
