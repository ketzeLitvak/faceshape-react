export function Troubleshooting() {
  return (
    <section id="docs-troubleshooting">
      <h2>Frequently asked questions</h2>
      <h3>“It requires every face part”</h3>
      <p>
        This is the contract. Include eyes, mouth and eyebrows even when choosing{' '}
        <code>none</code>. <code>faceStyle</code> and <code>FACE_PRESETS</code> have been
        removed.
      </p>
      <h3>“It does not blink or talk”</h3>
      <p>
        Check the capabilities of that style and expression, <code>motion</code>, and
        reduced motion settings. Line mouths and beaks keep their shape and do not open.
      </p>
      <h3>“The face extends outside my drawing”</h3>
      <p>
        Reduce or reposition <code>faceBox</code>. If names vary the silhouette,
        recalculate the box in <code>fromName</code>. Leave room for gaze, eyebrows and
        open expressions.
      </p>
      <h3>“The name changes the color, but I want a fixed color”</h3>
      <p>
        Pass <code>color</code>. Identity and outline stay the same; only automatic color
        is replaced.
      </p>
      <h3>“I want a penguin with a different mouth”</h3>
      <p>
        You can do that. The silhouette does not include the beak: <code>beak</code> is an
        interchangeable mouth style available for any shape.
      </p>
    </section>
  );
}
