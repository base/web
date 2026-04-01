'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';

const ANIMATION_SPEED = 0.08;

type InteractionState = {
  mouseUV: THREE.Vector2;
  isHovered: boolean;
  isPressed: boolean;
  isGrabbing: boolean;
};

type AnimationState = {
  hoverProgress: number;
  targetHover: number;
  animationFrameId: number | null;
};

type InteractionUniforms = {
  u_mouseUV: THREE.Uniform<THREE.Vector2>;
  u_isHovered: THREE.Uniform<number>;
  u_isPressed: THREE.Uniform<number>;
  u_isGrabbing: THREE.Uniform<number>;
};

export function useWebGLInteraction(
  elementRef: React.RefObject<HTMLElement> | HTMLElement | null,
  options: { smoothHover?: boolean } = {},
): InteractionUniforms {
  const { smoothHover = false } = options;

  // Helper to get the actual element
  const getElement = useCallback((): HTMLElement | null => {
    if (!elementRef) return null;
    if ('current' in elementRef) return elementRef.current;
    return elementRef;
  }, [elementRef]);

  const stateRef = useRef<InteractionState>({
    mouseUV: new THREE.Vector2(-1, -1),
    isHovered: false,
    isPressed: false,
    isGrabbing: false,
  });

  const animationRef = useRef<AnimationState>({
    hoverProgress: 0,
    targetHover: 0,
    animationFrameId: null,
  });

  const rectRef = useRef<DOMRect | null>(null);
  const uniformsRef = useRef<InteractionUniforms>({
    u_mouseUV: new THREE.Uniform(new THREE.Vector2(-1, -1)),
    u_isHovered: new THREE.Uniform(0),
    u_isPressed: new THREE.Uniform(0),
    u_isGrabbing: new THREE.Uniform(0),
  });

  const animateHover = useCallback(() => {
    const animation = animationRef.current;
    const uniforms = uniformsRef.current;

    const speed = ANIMATION_SPEED;
    const diff = animation.targetHover - animation.hoverProgress;

    if (Math.abs(diff) > 0.001) {
      animation.hoverProgress += diff * speed;
      uniforms.u_isHovered.value = animation.hoverProgress;
      animation.animationFrameId = requestAnimationFrame(animateHover);
    } else {
      animation.hoverProgress = animation.targetHover;
      uniforms.u_isHovered.value = animation.hoverProgress;
      animation.animationFrameId = null;
    }
  }, []);

  const updateUniforms = useCallback(() => {
    const state = stateRef.current;
    const uniforms = uniformsRef.current;
    const animation = animationRef.current;

    uniforms.u_mouseUV.value.copy(state.mouseUV);

    if (smoothHover) {
      const newTargetHover = state.isHovered ? 1 : 0;
      if (animation.targetHover !== newTargetHover) {
        animation.targetHover = newTargetHover;
        if (animation.animationFrameId === null) {
          animation.animationFrameId = requestAnimationFrame(animateHover);
        }
      }
    } else {
      uniforms.u_isHovered.value = state.isHovered ? 1 : 0;
    }

    uniforms.u_isPressed.value = state.isPressed ? 1 : 0;
    uniforms.u_isGrabbing.value = state.isGrabbing ? 1 : 0;
  }, [animateHover, smoothHover]);

  const updateRect = useCallback(() => {
    const element = getElement();
    if (element) {
      const rect = element.getBoundingClientRect();
      // Only update if element has valid dimensions
      if (rect.width > 0 && rect.height > 0) {
        rectRef.current = rect;
        return true;
      }
    }
    return false;
  }, [getElement]);

  const screenToUV = useCallback((clientX: number, clientY: number): THREE.Vector2 => {
    const rect = rectRef.current;
    if (!rect) return new THREE.Vector2(-1, -1);

    const x = (clientX - rect.left) / rect.width;
    const y = 1 - (clientY - rect.top) / rect.height;

    return new THREE.Vector2(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)));
  }, []);

  useEffect(() => {
    const element = getElement();
    if (!element) return;

    // Capture the animation ref for cleanup.
    // Note: This creates a reference to the same object, not a copy.
    // Modifying animationState.animationFrameId will update animationRef.current.animationFrameId
    const animationState = animationRef.current;

    // Ensure initial rect measurement happens after layout is stable
    const scheduleInitialRect = () => {
      requestAnimationFrame(() => {
        if (!updateRect()) {
          requestAnimationFrame(() => {
            updateRect();
          });
        }
      });
    };

    scheduleInitialRect();

    const handleMouseMove = (e: MouseEvent) => {
      const uv = screenToUV(e.clientX, e.clientY);
      stateRef.current.mouseUV.copy(uv);
      stateRef.current.isHovered = true;
      updateUniforms();
    };

    const handleMouseEnter = () => {
      stateRef.current.isHovered = true;
      updateUniforms();
    };

    const handleMouseLeave = () => {
      stateRef.current.isHovered = false;
      stateRef.current.mouseUV.set(-1, -1);
      updateUniforms();
    };

    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.isPressed = true;
      if (e.button === 0) {
        stateRef.current.isGrabbing = true;
      }
      updateUniforms();
    };

    const handleMouseUp = () => {
      stateRef.current.isPressed = false;
      stateRef.current.isGrabbing = false;
      updateUniforms();
    };

    const handleGlobalMouseUp = () => {
      if (stateRef.current.isPressed || stateRef.current.isGrabbing) {
        stateRef.current.isPressed = false;
        stateRef.current.isGrabbing = false;
        updateUniforms();
      }
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    const handleResize = () => {
      requestAnimationFrame(updateRect);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateRect);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ResizeObserver for element size changes
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateRect);
    });
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();

      if (animationState.animationFrameId !== null) {
        cancelAnimationFrame(animationState.animationFrameId);
        animationState.animationFrameId = null;
      }
    };
  }, [getElement, screenToUV, updateRect, updateUniforms]);

  return uniformsRef.current;
}
