import type { FaceLayout } from '../types';

export function validateFaceLayout(layout: FaceLayout | undefined) {
  if (!layout) {
    return;
  }
  const { eyes, mouth } = layout;
  const values = [
    ...(eyes ? [eyes.spacing, eyes.y, eyes.scale] : []),
    ...(mouth ? [mouth.y, mouth.scale] : []),
  ];
  if (
    values.some((value) => !Number.isFinite(value)) ||
    (eyes &&
      (eyes.spacing < 0 ||
        eyes.spacing > 50 ||
        eyes.y < 0 ||
        eyes.y > 100 ||
        eyes.scale <= 0)) ||
    (mouth && (mouth.y < 0 || mouth.y > 100 || mouth.scale <= 0))
  ) {
    throw new Error(
      'faceLayout needs finite positions within 0..100 and positive scales',
    );
  }
}
