import { BROW_STRATEGIES } from '../../../../src/react/eyebrows/registry';
import { EYE_STRATEGIES } from '../../../../src/react/eyes/registry';
import { MOUTH_STRATEGIES } from '../../../../src/react/mouths/registry';

export function FaceVariants() {
  return (
    <section id="docs-face">
      <h2>Eyes, mouths and eyebrows</h2>
      <p>
        Choose each part independently. Style controls appearance; expression controls
        emotion. Combine a beak with a circle or shark teeth with a device.
      </p>
      <p>
        Choose <code>none</code> to hide any part. You can render eyes only, a mouth only,
        eyebrows without eyes, or a silhouette without a face. Hidden eyes disable blink
        and gaze; a hidden mouth disables talking.
      </p>
      <h3>Eyes</h3>
      <div className="docs-tokens">
        {Object.keys(EYE_STRATEGIES).map((value) => (
          <code key={value}>{value}</code>
        ))}
      </div>
      <p>
        <code>cartoon</code> has whites and pupils; <code>bright</code> adds highlights;{' '}
        <code>sly</code> has narrowed lids; <code>capsule</code> supports autonomous
        glances. Arc styles may open when the expression requires it.{' '}
        <code>eyelashes</code> adds lashes; <code>heart</code> and <code>star</code>{' '}
        change pupils; <code>softLids</code> adds soft lids; <code>cyclops</code> has one
        eye and a central eyebrow; <code>spiral</code> draws spirals that also blink.
      </p>
      <h3>Mouths</h3>
      <div className="docs-tokens">
        {Object.keys(MOUTH_STRATEGIES).map((value) => (
          <code key={value}>{value}</code>
        ))}
      </div>
      <p>
        <code>standard</code> always stays a single line. <code>beak</code> preserves its
        outline and follows gaze. <code>shark</code> places teeth along the mouth edge. In{' '}
        <code>happy</code>, <code>cat</code> stays closed and adds rosy cheeks with any
        eye style.
      </p>
      <h3>Eyebrows</h3>
      <div className="docs-tokens">
        {Object.keys(BROW_STRATEGIES).map((value) => (
          <code key={value}>{value}</code>
        ))}
      </div>
      <p>
        <code>expression</code> follows emotion, including visibility. Other styles use
        specific geometry; <code>none</code> hides them. Eyes and eyebrows move together
        when the entire gaze shifts.
      </p>
    </section>
  );
}
