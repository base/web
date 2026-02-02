/**
 * @jest-environment jsdom
 */
import { render, waitFor } from '@testing-library/react';
import RegistrationBackground from './index';
import { FlowBackgroundSteps } from 'apps/web/src/components/Basenames/shared/types';

// Helper to wait for transitions to settle
async function renderAndWait(ui: React.ReactElement) {
  const result = render(ui);
  await waitFor(() => {
    expect(result.container).toBeInTheDocument();
  });
  return result;
}

// Mock the RegistrationContext
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  registrationTransitionDuration: 'duration-700',
}));

// Mock the FloatingENSPills component
jest.mock('apps/web/src/components/Basenames/FloatingENSPills', () => ({
  FloatingENSPills: () => <div data-testid="floating-ens-pills">FloatingENSPills</div>,
}));

// Mock the LottieAnimation component
jest.mock('apps/web/src/components/LottieAnimation', () => ({
  __esModule: true,
  default: ({ wrapperClassName }: { wrapperClassName?: string }) => (
    <div data-testid="lottie-animation" className={wrapperClassName}>
      LottieAnimation
    </div>
  ),
}));

// Mock video assets
jest.mock('./assets/fireworks.webm', () => 'mocked-fireworks.webm');
jest.mock('./assets/globe.webm', () => 'mocked-globe.webm');
jest.mock('./assets/vortex.json', () => ({ mock: 'vortex-data' }));

describe('RegistrationBackground', () => {
  describe('Search step', () => {
    it('should render FloatingENSPills when backgroundStep is Search', async () => {
      const { getByTestId } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Search} />,
      );

      expect(getByTestId('floating-ens-pills')).toBeInTheDocument();
    });

    it('should not render LottieAnimation when backgroundStep is Search', async () => {
      const { queryByTestId } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Search} />,
      );

      expect(queryByTestId('lottie-animation')).not.toBeInTheDocument();
    });

    it('should not render video elements when backgroundStep is Search', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Search} />,
      );

      const videos = container.querySelectorAll('video');
      expect(videos).toHaveLength(0);
    });
  });

  describe('Form step', () => {
    it('should render globe video when backgroundStep is Form', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();

      const source = video?.querySelector('source');
      expect(source).toHaveAttribute('src', 'mocked-globe.webm');
      expect(source).toHaveAttribute('type', 'video/webm');
    });

    it('should have correct video attributes for globe video', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      const video = container.querySelector('video');
      expect(video).toHaveAttribute('autoplay');
      expect(video).toHaveAttribute('loop');
      expect(video).toHaveProperty('muted', true);
    });

    it('should not render FloatingENSPills when backgroundStep is Form', async () => {
      const { queryByTestId } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      expect(queryByTestId('floating-ens-pills')).not.toBeInTheDocument();
    });

    it('should have gray background for Form step', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      const grayBackground = container.querySelector('.bg-\\[\\#F7F7F7\\]');
      expect(grayBackground).toBeInTheDocument();
    });
  });

  describe('Pending step', () => {
    it('should render LottieAnimation when backgroundStep is Pending', async () => {
      const { getByTestId } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Pending} />,
      );

      expect(getByTestId('lottie-animation')).toBeInTheDocument();
    });

    it('should not render FloatingENSPills when backgroundStep is Pending', async () => {
      const { queryByTestId } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Pending} />,
      );

      expect(queryByTestId('floating-ens-pills')).not.toBeInTheDocument();
    });

    it('should have gray background for Pending step', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Pending} />,
      );

      const grayBackground = container.querySelector('.bg-\\[\\#F7F7F7\\]');
      expect(grayBackground).toBeInTheDocument();
    });

    it('should apply lottie wrapper classes for centered positioning', async () => {
      const { getByTestId } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Pending} />,
      );

      const lottie = getByTestId('lottie-animation');
      expect(lottie).toHaveClass('absolute');
      expect(lottie).toHaveClass('max-w-[50rem]');
      expect(lottie).toHaveClass('max-h-[50rem]');
    });
  });

  describe('Success step', () => {
    it('should render fireworks video when backgroundStep is Success', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Success} />,
      );

      const video = container.querySelector('video');
      expect(video).toBeInTheDocument();

      const source = video?.querySelector('source');
      expect(source).toHaveAttribute('src', 'mocked-fireworks.webm');
      expect(source).toHaveAttribute('type', 'video/webm');
    });

    it('should have correct video attributes for fireworks video', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Success} />,
      );

      const video = container.querySelector('video');
      expect(video).toHaveAttribute('autoplay');
      expect(video).toHaveAttribute('loop');
      expect(video).toHaveProperty('muted', true);
    });

    it('should not render FloatingENSPills when backgroundStep is Success', async () => {
      const { queryByTestId } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Success} />,
      );

      expect(queryByTestId('floating-ens-pills')).not.toBeInTheDocument();
    });

    it('should have blue background for Success step', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Success} />,
      );

      const blueBackground = container.querySelector('.bg-\\[\\#025cfe\\]');
      expect(blueBackground).toBeInTheDocument();
    });
  });

  describe('Transition components', () => {
    it('should apply transition duration classes', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Search} />,
      );

      const transitionElements = container.querySelectorAll('.duration-700');
      expect(transitionElements.length).toBeGreaterThan(0);
    });

    it('should apply transition-opacity class', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      const transitionElements = container.querySelectorAll('.transition-opacity');
      expect(transitionElements.length).toBeGreaterThan(0);
    });
  });

  describe('common styling', () => {
    it('should apply pointer-events-none to background containers', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      const pointerEventsNone = container.querySelector('.pointer-events-none');
      expect(pointerEventsNone).toBeInTheDocument();
    });

    it('should apply negative z-index to background containers', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      const zIndex = container.querySelector('.-z-10');
      expect(zIndex).toBeInTheDocument();
    });

    it('should apply motion-reduce:hidden to videos', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      const motionReduce = container.querySelector('.motion-reduce\\:hidden');
      expect(motionReduce).toBeInTheDocument();
    });

    it('should apply object-cover to videos', async () => {
      const { container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      const objectCover = container.querySelector('.object-cover');
      expect(objectCover).toBeInTheDocument();
    });
  });

  describe('step transitions', () => {
    it('should only show one background at a time for Search', async () => {
      const { queryByTestId, container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Search} />,
      );

      expect(queryByTestId('floating-ens-pills')).toBeInTheDocument();
      expect(queryByTestId('lottie-animation')).not.toBeInTheDocument();
      expect(container.querySelectorAll('video')).toHaveLength(0);
    });

    it('should only show globe video for Form step', async () => {
      const { queryByTestId, container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Form} />,
      );

      expect(queryByTestId('floating-ens-pills')).not.toBeInTheDocument();
      expect(queryByTestId('lottie-animation')).not.toBeInTheDocument();

      const videos = container.querySelectorAll('video');
      expect(videos).toHaveLength(1);

      const source = videos[0].querySelector('source');
      expect(source).toHaveAttribute('src', 'mocked-globe.webm');
    });

    it('should only show lottie animation for Pending step', async () => {
      const { queryByTestId, container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Pending} />,
      );

      expect(queryByTestId('floating-ens-pills')).not.toBeInTheDocument();
      expect(queryByTestId('lottie-animation')).toBeInTheDocument();
      expect(container.querySelectorAll('video')).toHaveLength(0);
    });

    it('should only show fireworks video for Success step', async () => {
      const { queryByTestId, container } = await renderAndWait(
        <RegistrationBackground backgroundStep={FlowBackgroundSteps.Success} />,
      );

      expect(queryByTestId('floating-ens-pills')).not.toBeInTheDocument();
      expect(queryByTestId('lottie-animation')).not.toBeInTheDocument();

      const videos = container.querySelectorAll('video');
      expect(videos).toHaveLength(1);

      const source = videos[0].querySelector('source');
      expect(source).toHaveAttribute('src', 'mocked-fireworks.webm');
    });
  });
});
