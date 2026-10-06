import { CodeBlock } from '../../CodeBlock';
import { motionExample } from '../../examples.en';

export function Motion() {
  return (
    <section id="docs-motion">
      <h2>Motion and capabilities</h2>
      <CodeBlock code={motionExample} />
      <div className="docs-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>idle</code>
              </td>
              <td>
                Gentle body motion. Capsule eyes also use autonomous gaze unless{' '}
                <code>glance</code> is explicitly set.
              </td>
            </tr>
            <tr>
              <td>
                <code>blink</code>
              </td>
              <td>Periodic blinking when the eye pose supports it.</td>
            </tr>
            <tr>
              <td>
                <code>talking</code>
              </td>
              <td>Oscillates mouth opening, without audio.</td>
            </tr>
            <tr>
              <td>
                <code>lookAt</code>
              </td>
              <td>
                Follows cursor or touch, or targets normalized coordinates from 0 to 1.
              </td>
            </tr>
            <tr>
              <td>
                <code>glance</code>
              </td>
              <td>Autonomous gaze. Can be enabled or disabled explicitly.</td>
            </tr>
            <tr>
              <td>
                <code>bounce</code> / <code>shake</code>
              </td>
              <td>Bounces or shakes the body.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        On mobile, <code>lookAt="cursor"</code> follows the finger during contact.
        Releasing or starting to scroll returns gaze to the center. Page scrolling is not
        blocked.
      </p>
      <p>
        Eyes with whites move only their pupils. Other styles move the mouth by a fraction
        of eye and eyebrow movement. Beaks and single-line mouths do not talk; neither
        does a closed cat mouth in <code>happy</code>.
      </p>
      <p>
        <code>getMotionCapabilities(eyes, mouth, geometry)</code> returns{' '}
        <code>blink</code>, <code>talking</code> and <code>lookAt</code>. For built-in
        emotions, use <code>resolveExpression(expression)</code>. The demo uses these same
        capabilities to disable unsupported controls.
      </p>
      <p>
        The system reduced motion preference is always respected.{' '}
        <code>reducedMotion={'{true}'}</code> also stops motion explicitly. Use{' '}
        <code>label</code> for meaningful characters; without a label, the SVG is
        decorative.
      </p>
    </section>
  );
}
