'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Text from 'apps/web/src/components/base-org/typography/Text';
import AnimatedfeeDots from 'apps/web/src/components/base-org/root/TransactionsFeesSection/AnimatedFeeDots';
import { Transition } from '@headlessui/react';

export default function TransactionsFeesSection() {
  const [showText, setShowText] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const updateProgress = useCallback(() => {
    if (!sectionRef.current || !isInView) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate progress based on the section's position
    let newProgress;
    const startPoint = viewportHeight * 0.8; // Section comes into view
    const endPoint = viewportHeight * 0.3; // 30% from the top of the viewport

    if (rect.top >= startPoint) {
      newProgress = 0;
    } else if (rect.top <= endPoint) {
      newProgress = 1;
    } else {
      newProgress = 1 - (rect.top - endPoint) / (startPoint - endPoint);
    }

    newProgress = Math.min(1, Math.max(0, newProgress));

    // Smooth out the progress changes
    setProgress((prev) => prev + (newProgress - prev) * 0.1);

    // Check for animation end and start
    if (newProgress >= 0.99 && !showText) {
      setShowText(true);
    } else if (newProgress < 0.99 && showText) {
      setShowText(false);
    }
  }, [showText, isInView]);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the section is visible
      },
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!isInView) return;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (window.scrollY !== lastScrollY.current) {
        lastScrollY.current = window.scrollY;
        animationFrameId.current = requestAnimationFrame(updateProgress);
      }
    };

    if (isInView) {
      window.addEventListener('scroll', onScroll);
      updateProgress(); // Initial call to set correct state when coming into view
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isInView, updateProgress]);

  return (
    <section ref={sectionRef}>
      <div className="mb-12 mt-8 flex w-full flex-col items-center gap-8 md:flex-row">
        <div className="w-full">
          <Title level={TitleLevel.Display2} className="text-[#E3E7E9]">
            Transactions
            <br /> below <span className="text-blue">one cent*</span>
          </Title>
        </div>
        <div className="flex w-full flex-row gap-2 md:gap-4">
          <div className="w-full">
            <AnimatedfeeDots
              color="#656565"
              progress={1}
              title="Ethereum Mainnet Transactions fees are high"
            />
          </div>
          <div className="w-full self-end">
            <Transition
              appear
              show={showText}
              className="transition-all md:inline-block"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Text className="mb-6 text-[#E3E7E9]">
                Base is the best of Ethereum but 10-100x cheaper. To make onchain accessible for
                everyone, we&apos;re working to keep fees consistently below 1 cent.
              </Text>
              <Text className="mb-6 text-[#E3E7E9]">*Based on 90-day average</Text>
            </Transition>
            <AnimatedfeeDots
              isBase
              color="#4083CD"
              progress={progress}
              title="Base Mainnet Transactions fees are low"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
