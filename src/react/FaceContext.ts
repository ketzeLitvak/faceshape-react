import { createContext, useContext } from 'react';
import type { FaceState } from './types';
export const FaceContext = createContext<FaceState | null>(null);
export function useFace() {
  const context = useContext(FaceContext); if (!context)
    throw new Error('Face parts must be inside Character'); return context;
}
