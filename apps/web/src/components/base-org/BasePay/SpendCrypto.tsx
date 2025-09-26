'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

export default function SpendCrypto() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.8'],
  });

  const token1Opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const token2Opacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const token3Opacity = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);
  const token4Opacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  const token1Style = useMemo(() => ({ opacity: token1Opacity }), [token1Opacity]);
  const token2Style = useMemo(() => ({ opacity: token2Opacity }), [token2Opacity]);
  const token3Style = useMemo(() => ({ opacity: token3Opacity }), [token3Opacity]);
  const token4Style = useMemo(() => ({ opacity: token4Opacity }), [token4Opacity]);

  return (
    <section ref={ref} className="col-span-full py-12 text-black">
      <div className="flex flex-col-reverse gap-12 justify-between items-center md:flex-row">
        <div className="relative flex h-80 w-96 max-w-full items-start justify-center overflow-hidden rounded-md bg-gray-5 px-8 pb-8 pt-12 md:pb-12 lg:h-[450px]">
          <div className="flex relative justify-center items-start pt-8 w-full h-full">
            {/* Token 1 */}
            <motion.div
              className="absolute z-[9] -translate-y-36 lg:-translate-y-40"
              style={token1Style}
            >
              <div className="drop-shadow-sm scale-50 lg:scale-100">
                <ImageWithLoading
                  src="/images/partners/usdc.svg"
                  alt="USDC token"
                  width={134}
                  height={134}
                />
              </div>
            </motion.div>

            {/* Token 2 */}
            <motion.div
              className="absolute z-[8] -translate-y-24 lg:-translate-y-20"
              style={token2Style}
            >
              <div className="drop-shadow-md scale-75 lg:scale-110">
                <ImageWithLoading
                  src="/images/partners/usdc.svg"
                  alt="USDC token"
                  width={134}
                  height={134}
                />
              </div>
            </motion.div>

            {/* Token 3 */}
            <motion.div
              className="absolute z-[7] -translate-y-8 lg:translate-y-4"
              style={token3Style}
            >
              <div className="drop-shadow-lg scale-90 lg:scale-125">
                <ImageWithLoading
                  src="/images/partners/usdc.svg"
                  alt="USDC token"
                  width={134}
                  height={134}
                />
              </div>
            </motion.div>

            {/* Token 4 */}
            <motion.div
              className="absolute z-[6] translate-y-12 lg:translate-y-32"
              style={token4Style}
            >
              <div className="drop-shadow-xl lg:scale-150">
                <ImageWithLoading
                  src="/images/partners/usdc.svg"
                  alt="USDC token"
                  width={134}
                  height={134}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:max-w-sm">
          <Title level={TitleLevel.H1Regular}>Spend crypto like cash.</Title>
          <Title level={TitleLevel.H2Regular}>
            USDC is one of the most trusted and reputable stablecoins, combining the stability of
            the dollar with the speed of the internet.
          </Title>
        </div>
      </div>
    </section>
  );
}
