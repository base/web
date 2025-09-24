import { motion, Variants, cubicBezier } from 'motion/react';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import classNames from 'classnames';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

const itemContentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: easeFn } },
};

export function NotFoundTitle({ className }: { className?: string }) {
  return (
    <motion.div
      className={classNames(className)}
      variants={itemContentVariants}
      initial="hidden"
      whileInView="visible"
    >
      <Title level={TitleLevel.H2Regular}>Got lost?</Title>
    </motion.div>
  );
}
