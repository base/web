'use client';

import {
  itemContentVariants,
  Section,
} from 'apps/web/src/components/base-org/root/Redesign/Section';
import Title, { levelStyles } from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { motion } from 'motion/react';
import classNames from 'classnames';

export function SectionMetrics() {
  return (
    <Section content={content}>
      <MetricsGrid />
    </Section>
  );
}

const content = {
  title: 'Metrics that matter',
  description:
    'Fast, open, and built to scale. The Base economy is growing every day, fueled by real builders.',
};

function MetricsGrid() {
  return (
    <motion.div
      className="col-span-full grid grid-cols-1 gap-8 py-10 sm:grid-cols-2"
      variants={itemContentVariants}
    >
      <MetricCard
        title="Gas Price"
        description="Unit cost to process a transaction."
        icon={Icons.gasFees}
        value="0.0003"
        unit="ETH"
      />
      <MetricCard
        title="TPS"
        description="Transactions processed per second."
        icon={Icons.transactions}
        value="12"
      />
      <MetricCard
        title="Median Transaction fee"
        description="Typical fee per transaction on Base."
        icon={Icons.median}
        value="08"
      />
      <MetricCard
        title="Assets on Platform"
        description="Unique assets available on Base."
        icon={Icons.platform}
        value="23,489"
      />
    </motion.div>
  );
}

type MetricCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: string;
  unit?: string;
};

const animationConfig = {
  initial: {
    color: '#9CA3AF',
    opacity: 0.6,
  },
  whileInView: {
    color: 'inherit',
    opacity: 1,
  },
  viewport: { once: true, amount: 0.3 },
};

const easeFn = [0.4, 0, 0.2, 1];

const getTransition = (delay: number, index: number) => ({
  duration: 0.4,
  delay: delay + index * 0.05,
  ease: easeFn,
});

const getColumnTransition = (delay: number, index: number) => ({
  duration: 0.8,
  delay: delay + index * 0.1,
  ease: easeFn,
});

const isFixedChar = (char: string) => /[.,\s-]/.test(char);

// deterministic characters tho
const generateRandomChars = (targetChar: string, index: number) => {
  const isNumeric = /[0-9]/.test(targetChar);
  const isAlpha = /[A-Z]/i.test(targetChar);

  let chars: string;
  if (isNumeric) {
    chars = '0123456789';
  } else if (isAlpha) {
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  } else {
    chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  // no random
  return [chars[(index * 7) % chars.length], chars[(index * 11 + 3) % chars.length]];
};

export function AnimatedText({
  text,
  titleLevel,
  className = '',
  delay = 0,
}: {
  text: string;
  titleLevel: TitleLevel;
  className?: string;
  delay?: number;
}) {
  const characters = text.split('').map((char, index) => {
    const baseId = `${text}_${char === ' ' ? 'space' : char}_${index}`;

    if (isFixedChar(char)) {
      // fixed chars don't animate, like , or .
      return {
        actualChar: char,
        isFixed: true,
        id: baseId,
      };
    }

    const randomChars = generateRandomChars(char, index);
    return {
      actualChar: char,
      isFixed: false,
      column: [
        { char: randomChars[0], id: `${baseId}_0` },
        { char: randomChars[1], id: `${baseId}_1` },
        { char, id: `${baseId}_2` },
      ],
      id: baseId,
    };
  });

  const titleClass = levelStyles[titleLevel] ?? '';

  const charHeight = titleLevel === TitleLevel.H4Mono ? '1.4em' : '1.2em';
  const slideDistance = titleLevel === TitleLevel.H4Mono ? '-2.8em' : '-2.4em';

  const containerStyle = {
    height: charHeight,
    lineHeight: charHeight,
  };
  const charStyle = {
    height: charHeight,
    lineHeight: charHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const initialAnimation = { y: 0 };
  const finalAnimation = { y: slideDistance };
  const viewportConfig = { once: true, amount: 0.3 };
  const finalCharAnimation = { opacity: 1 };

  return (
    <div className={classNames('inline-flex', className)}>
      {characters.map((charData, index) => {
        if (charData.isFixed) {
          // fixed chars
          return (
            <motion.span
              key={charData.id}
              initial={animationConfig.initial}
              whileInView={animationConfig.whileInView}
              viewport={animationConfig.viewport}
              transition={getTransition(delay + index * 0.1, 0)}
              className={titleClass}
              style={charStyle}
            >
              {charData.actualChar === ' ' ? '\u00A0' : charData.actualChar}
            </motion.span>
          );
        }

        // animated chars
        const { column, id } = charData;
        if (!column) return null;
        return (
          <div
            key={id}
            className={classNames('relative overflow-hidden', titleClass)}
            style={containerStyle}
          >
            <motion.div
              initial={initialAnimation}
              whileInView={finalAnimation}
              viewport={viewportConfig}
              transition={getColumnTransition(delay, index)}
              className="flex flex-col"
            >
              {column.map((charObj, charIndex) => {
                const isFinalChar = charIndex === 2;
                return (
                  <motion.span
                    key={charObj.id}
                    initial={isFinalChar ? finalCharAnimation : animationConfig.initial}
                    whileInView={isFinalChar ? finalCharAnimation : animationConfig.whileInView}
                    viewport={animationConfig.viewport}
                    transition={getTransition(delay + index * 0.1, charIndex)}
                    className={classNames(titleClass, 'block')}
                    style={charStyle}
                  >
                    {charObj.char === ' ' ? '\u00A0' : charObj.char}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function MetricCard({ title, description, icon, value, unit }: MetricCardProps) {
  return (
    <div className="col-span-1 flex w-full flex-col rounded-lg bg-base-gray-25 p-6">
      <div className="mb-20 flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Title level={TitleLevel.H6Regular} as="h6">
            {title}
          </Title>
          <Text variant={TextVariant.Body} className="!text-base-gray-200">
            {description}
          </Text>
        </div>
        <div className="ml-3 h-8 w-8 flex-shrink-0">{icon}</div>
      </div>
      <div className="flex items-end gap-3">
        <AnimatedText text={value} titleLevel={TitleLevel.H4Mono} delay={0.2} />
        {unit && (
          <AnimatedText
            text={unit}
            titleLevel={TitleLevel.H6Mono}
            className="pb-2 lg:pb-5"
            delay={0.2}
          />
        )}
      </div>
    </div>
  );
}

export const Icons = {
  gasFees: (
    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25.8839 28.7939C31.3512 23.3036 31.3512 14.402 25.8839 8.91169C20.4165 3.42136 11.5522 3.42136 6.08488 8.91169C0.61754 14.402 0.61754 23.3036 6.08488 28.7939L7.9705 26.9004C3.54456 22.4558 3.54456 15.2498 7.9705 10.8052C12.3964 6.36069 19.5723 6.36069 23.9983 10.8052C28.4242 15.2498 28.4242 22.4558 23.9983 26.9004L25.8839 28.7939Z"
        fill="#0A0B0D"
      />
      <path
        d="M18.651 18.7939C18.651 20.2667 17.4571 21.4606 15.9844 21.4606C15.2479 21.4606 14.5812 21.1621 14.0986 20.6794L7.95827 22.3247L7.26809 19.7489L13.4079 18.1038C13.712 16.9656 14.7503 16.1273 15.9844 16.1273C17.4571 16.1273 18.651 17.3212 18.651 18.7939Z"
        fill="#0A0B0D"
      />
    </svg>
  ),
  transactions: (
    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.4321 3.46045L24.0988 8.12712L10.6512 8.12711V10.7938L24.0988 10.7938L19.4322 15.4604H23.2034L29.2034 9.46047L23.2034 3.46045H19.4321Z"
        fill="#0A0B0D"
      />
      <path
        d="M7.87017 22.7938L22.6512 22.7938V25.4605L7.87022 25.4604L12.5369 30.1271H8.76565L2.76562 24.1271L8.76561 18.1271H12.5368L7.87017 22.7938Z"
        fill="#0A0B0D"
      />
    </svg>
  ),
  median: (
    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.319 24.7946C8.90073 24.7946 5.31901 21.2129 5.31901 16.7946C5.31901 12.3763 8.90073 8.7946 13.319 8.7946C17.7373 8.7946 21.319 12.3763 21.319 16.7946C21.319 21.2129 17.7373 24.7946 13.319 24.7946ZM13.319 27.4613C19.21 27.4613 23.9857 22.6856 23.9857 16.7946C23.9857 10.9036 19.21 6.12793 13.319 6.12793C7.42797 6.12793 2.65234 10.9036 2.65234 16.7946C2.65234 22.6856 7.42797 27.4613 13.319 27.4613Z"
        fill="#0A0B0D"
      />
      <path
        d="M19.9336 26.1278C19.9509 26.1279 19.9683 26.1279 19.9857 26.1279C20.0031 26.1279 20.0204 26.1279 20.0378 26.1278H19.9336ZM23.9855 25.2298C27.1389 23.7319 29.319 20.5179 29.319 16.7946C29.319 13.0713 27.1389 9.85726 23.9855 8.35935V11.4606C25.6049 12.6769 26.6523 14.6134 26.6523 16.7946C26.6523 18.9758 25.6049 20.9123 23.9855 22.1286V25.2298Z"
        fill="#0A0B0D"
      />
    </svg>
  ),
  platform: (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.98877 19.6953V5.69531H3.98877L3.98877 11.6953L19.9888 11.6953V5.69531H21.9888V19.6953H19.9888V13.6953L3.98877 13.6953L3.98877 19.6953H1.98877Z"
        fill="#0A0B0D"
      />
    </svg>
  ),
};
