import { create } from 'zustand';

export type WebGLElement = {
  element: HTMLDivElement;
  fragmentShader: string;
  customUniforms?: Record<string, THREE.Uniform>;
};

export type WebGLStore = {
  elements: WebGLElement[];
  setElements: (elements: WebGLElement[] | ((prev: WebGLElement[]) => WebGLElement[])) => void;
};

export const useWebGLStore = create<WebGLStore>((set) => ({
  elements: [],
  setElements: (elements) =>
    set((state) => ({
      elements: typeof elements === 'function' ? elements(state.elements) : elements,
    })),
}));
