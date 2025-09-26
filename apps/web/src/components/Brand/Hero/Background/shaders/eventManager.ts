import { valueRemap } from 'apps/web/src/utils/shaderUtils';
import { Canvas, events, RootState } from '@react-three/fiber';
import { DomEvent } from '@react-three/fiber/dist/declarations/src/core/events';
import * as THREE from 'three';

export const hitConfig = {
  scale: 1,
  onPointerMove: () => {},
  onPointerEnter: () => {},
};

export const eventManagerFactory: Parameters<typeof Canvas>[0]['events'] = (state) => ({
  ...events(state),
  enabled: true,
  priority: 1,
  filter: (items: THREE.Intersection[]) => items,
  compute: (event: DomEvent, rootState: RootState) => {
    let pointerX = (event.offsetX / rootState.size.width) * 2 - 1;
    let pointerY = -(event.offsetY / rootState.size.height) * 2 + 1;

    if (hitConfig.scale !== 1) {
      pointerX = valueRemap(pointerX, -1, 1, 0, hitConfig.scale);
      pointerY = valueRemap(pointerY, -1, 1, 0, hitConfig.scale);

      pointerX = pointerX % 1;
      pointerY = pointerY % 1;

      pointerX = valueRemap(pointerX, 0, 1, -1, 1);
      pointerY = valueRemap(pointerY, 0, 1, -1, 1);
    }

    rootState.pointer.set(pointerX, pointerY);
    rootState.raycaster.setFromCamera(rootState.pointer, rootState.camera);
  },
});
