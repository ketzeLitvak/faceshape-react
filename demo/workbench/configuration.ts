import { EXPRESSIONS, getEyeStyleNames, getMouthStyleNames, SHAPES } from '../../src';
import { DEMO_SHAPES } from '../shapes';
import type { SnippetOptions } from '../types';

export interface PlaygroundConfiguration extends SnippetOptions {
  reduced: boolean;
}
export interface SavedCharacter {
  id: string;
  configuration: PlaygroundConfiguration;
  title?: string;
  updatedAt?: string;
}
const motionKeys = ['idle', 'blink', 'bounce', 'shake', 'talking', 'glance'];
const brows = ['none', 'expression', 'soft', 'raised', 'angry', 'sad'];

export function parseConfiguration(value: unknown): PlaygroundConfiguration | undefined {
  if (!value || typeof value !== 'object') {
    return;
  }
  const v = value as Record<string, unknown>;
  const face = v.face as Record<string, unknown> | undefined;
  const motion = v.motion as Record<string, unknown> | undefined;
  if (
    typeof v.shape !== 'string' ||
    !Object.keys({ ...SHAPES, ...DEMO_SHAPES }).includes(v.shape) ||
    typeof v.name !== 'string' ||
    v.name.length > 120 ||
    typeof v.expression !== 'string' ||
    !Object.keys(EXPRESSIONS).includes(v.expression) ||
    !face ||
    !getEyeStyleNames().includes(String(face.eyes)) ||
    !getMouthStyleNames().includes(String(face.mouth)) ||
    !brows.includes(String(face.eyebrows)) ||
    typeof v.reduced !== 'boolean' ||
    (v.color !== undefined &&
      (typeof v.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(v.color))) ||
    !motion ||
    typeof motion !== 'object'
  ) {
    return;
  }
  if (
    motionKeys.some(
      (key) => motion[key] !== undefined && typeof motion[key] !== 'boolean',
    )
  ) {
    return;
  }
  if (
    motion.lookAt !== undefined &&
    motion.lookAt !== 'cursor' &&
    (!motion.lookAt ||
      typeof motion.lookAt !== 'object' ||
      !Number.isFinite((motion.lookAt as { x: number }).x) ||
      !Number.isFinite((motion.lookAt as { y: number }).y))
  ) {
    return;
  }
  return {
    shape: v.shape,
    name: v.name,
    expression: v.expression,
    color: v.color,
    reduced: v.reduced,
    face: { eyes: face.eyes, mouth: face.mouth, eyebrows: face.eyebrows },
    motion: Object.fromEntries(
      [...motionKeys, 'lookAt']
        .filter((key) => motion[key] !== undefined)
        .map((key) => [key, motion[key]]),
    ),
  } as PlaygroundConfiguration;
}

export function readSharedConfiguration(): PlaygroundConfiguration | undefined {
  try {
    const raw = new URLSearchParams(window.location.search).get('character');
    if (!raw || raw.length > 5000) {
      return;
    }
    return parseConfiguration(JSON.parse(raw));
  } catch {
    return;
  }
}

export function configurationURL(
  config: PlaygroundConfiguration,
  currentURL: string,
): string {
  const url = new URL(currentURL);
  url.searchParams.set('character', JSON.stringify(config));
  url.pathname = url.pathname.replace(/\/docs\/$/, '/');
  url.hash = 'demo';
  return url.toString();
}

export function readSavedCharacters(): SavedCharacter[] {
  try {
    const stored = JSON.parse(localStorage.getItem('faceshape:characters:v1') ?? '[]');
    if (!Array.isArray(stored)) {
      return [];
    }
    const ids = new Set<string>();
    return stored.slice(0, 20).flatMap((item) => {
      const configuration = parseConfiguration(item?.configuration);
      if (!configuration || typeof item.id !== 'string' || ids.has(item.id)) {
        return [];
      }
      ids.add(item.id);
      return [
        {
          id: item.id,
          configuration,
          title:
            typeof item.title === 'string'
              ? item.title.slice(0, 80)
              : configuration.name || 'Sin nombre',
          updatedAt:
            typeof item.updatedAt === 'string' &&
            Number.isFinite(Date.parse(item.updatedAt))
              ? item.updatedAt
              : undefined,
        },
      ];
    });
  } catch {
    return [];
  }
}
