import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

import { IconSwap } from './IconSwap';

const SLIDE_INTERVAL_MS = 3500;

const tokensList = [
  {
    id: 2,
    color: '#0052FF',
    component: <EthereumIcon />,
  },
  {
    id: 3,
    color: '#0B53BF',
    component: <USDCIcon />,
  },
  {
    id: 4,
    color: '#9391F7',
    component: <AAVEIcon />,
  },
  {
    id: 5,
    color: '#8DC351',
    component: <BitcoinIcon />,
  },
];

export function BaseAppBuy() {
  const [success, setSuccess] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [wrapWidth, setWrapWidth] = useState(0);
  const [shiftIndex, setShiftIndex] = useState(2);

  let gap = 30;
  let tokenWidth = 75;
  let copies = 4;

  const totalTokens = tokensList.length * copies;
  const startIndex = 2;
  const endIndex = totalTokens - 3;
  const centerIndex = ((shiftIndex % totalTokens) + totalTokens) % totalTokens;

  useEffect(() => {
    if (!wrapRef.current) return;

    const element = wrapRef.current;

    const updateWidth = () => {
      setWrapWidth(element.offsetWidth);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (wrapWidth === 0) return;

    const interval = setInterval(() => {
      setShiftIndex((prev) => {
        const next = prev + 1;
        const nextCenterIndex = ((next % totalTokens) + totalTokens) % totalTokens;

        // If we've gone past the 3rd-to-last token, reset back to the 3rd token
        if (nextCenterIndex > endIndex) {
          return startIndex;
        }

        return next;
      });
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [wrapWidth]);

  useEffect(() => {
    const halfWrapWidth = wrapWidth / 2;
    const shiftAmount = (tokenWidth + gap) * shiftIndex;
    const x = halfWrapWidth - tokenWidth / 2 - shiftAmount;
    const transform = `translateX(${x}px)`;

    if (wrapRef.current) {
      wrapRef.current.style.transform = transform;
    }
  }, [wrapWidth, shiftIndex]);

  let duplicatedTokens = Array.from({ length: copies }).flatMap(() => tokensList);

  return (
    <div
      onClick={() => setSuccess(!success)}
      className="relative flex h-full w-full items-center justify-center"
    >
      {/* <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ocspink " />
      <div className="absolute left-1/2 top-0 h-full w-px translate-x-1/2 bg-ocspink" /> */}

      <div ref={wrapRef} id="wrap" className="flex gap-0 spring-bounce-20 spring-duration-500">
        <div style={{ gap: gap }} className="flex w-full">
          {duplicatedTokens.map((token, index) => {
            const isCenter = index === centerIndex;
            const isLeft = index == centerIndex - 1;
            const isRight = index == centerIndex + 1;

            return (
              <div
                key={index}
                className="spring-bounce-30 spring-duration-500"
                style={{
                  width: tokenWidth,
                  height: tokenWidth,
                  transform: `scale(${isCenter ? 1.5 : isLeft || isRight ? 1.2 : 0.9}) 
                  translateX(${isLeft ? -tokenWidth / 8 : isRight ? tokenWidth / 8 : 0}px)`,
                }}
              >
                <IconSwap success={isCenter} backgroundColor={token.color} icon={token.component} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EthereumIcon() {
  return (
    <svg
      width="40"
      height="40"
      className="size-full"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.9978 5V15.6277L28.7443 19.6416L19.9978 5Z" fill="white" fillOpacity="0.602" />
      <path d="M19.9977 5L11.25 19.6416L19.9977 15.6277V5Z" fill="white" />
      <path
        d="M19.9978 26.5289V33.7502L28.7501 21.3145L19.9978 26.5289Z"
        fill="white"
        fillOpacity="0.602"
      />
      <path d="M19.9977 33.7502V26.5277L11.25 21.3145L19.9977 33.7502Z" fill="white" />
      <path
        d="M19.9978 24.857L28.7443 19.6413L19.9978 15.6299V24.857Z"
        fill="white"
        fillOpacity="0.2"
      />
      <path
        d="M11.25 19.6413L19.9977 24.857V15.6299L11.25 19.6413Z"
        fill="white"
        fillOpacity="0.602"
      />
    </svg>
  );
}

function USDCIcon() {
  return (
    <svg
      width="40"
      height="40"
      className="size-full"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.6004 5.4375V8.01252C28.7379 9.56252 32.5004 14.3375 32.5004 20C32.5004 25.6625 28.7379 30.4375 23.6004 31.9875V34.5625C30.1504 32.9625 35.0004 27.05 35.0004 20C35.0004 12.95 30.1504 7.0375 23.6004 5.4375Z"
        fill="white"
      />
      <path
        d="M7.5 20C7.5 14.3375 11.2625 9.56252 16.4 8.01252V5.4375C9.85 7.0375 5 12.95 5 20C5 27.05 9.85 32.9625 16.4 34.5625V31.9875C11.2625 30.45 7.5 25.6625 7.5 20Z"
        fill="white"
      />
      <path
        d="M25.3753 22.7876C25.3753 17.6751 17.3628 19.7752 17.3628 16.9501C17.3628 15.9376 18.1753 15.2876 19.7253 15.2876C21.5753 15.2876 22.2128 16.1876 22.4128 17.4001H24.9628C24.7353 15.1246 23.4293 13.6879 21.2503 13.2599V11.2501H18.7503V13.1881C16.3632 13.4921 14.8628 14.8823 14.8628 16.9501C14.8628 22.0876 22.8878 20.1626 22.8878 22.9376C22.8878 23.9876 21.8753 24.6876 20.1628 24.6876C17.9253 24.6876 17.1878 23.7001 16.9128 22.3376H14.4253C14.5864 24.83 16.1233 26.3899 18.7503 26.7792V28.7501H21.2503V26.8054C23.8142 26.4741 25.3753 24.9826 25.3753 22.7876Z"
        fill="white"
      />
    </svg>
  );
}

function AAVEIcon() {
  return (
    <svg
      width="32"
      height="32"
      className="size-full"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 16.2481C2.99814 8.93239 8.81962 3 16 3C23.1798 3 29.0012 8.93239 29 16.2481H25.6789C25.6789 10.7656 21.3798 6.32048 16 6.32048C10.6202 6.32048 6.32109 10.7656 6.32109 16.2481H3Z"
        fill="white"
      />
      <path
        d="M12.5485 16.5612C14.009 16.5612 15.193 15.3772 15.193 13.9167C15.193 12.4562 14.009 11.2722 12.5485 11.2722C11.088 11.2722 9.90403 12.4562 9.90403 13.9167C9.90403 15.3772 11.088 16.5612 12.5485 16.5612Z"
        fill="white"
      />
      <path
        d="M19.4604 16.5612C20.9209 16.5612 22.1049 15.3772 22.1049 13.9167C22.1049 12.4562 20.9209 11.2722 19.4604 11.2722C17.9999 11.2722 16.8159 12.4562 16.8159 13.9167C16.8159 15.3772 17.9999 16.5612 19.4604 16.5612Z"
        fill="white"
      />
    </svg>
  );
}

function BitcoinIcon() {
  return (
    <svg
      width="32"
      height="32"
      className="size-full"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.2071 10.5337C20.4311 8.56174 18.4851 8.38374 16.2191 8.82374L15.4121 6.01074L13.7001 6.50174L14.4861 9.24174C14.0361 9.36974 13.5781 9.51174 13.1231 9.65174L12.3331 6.89374L10.6221 7.38374L11.4271 10.1967C11.0591 10.3107 10.6971 10.4227 10.3421 10.5247L10.3391 10.5147L7.97705 11.1917L8.50205 13.0217C8.50205 13.0217 9.76005 12.6337 9.74505 12.6637C10.4391 12.4647 10.7801 12.8027 10.9451 13.1317L11.8651 16.3357C11.9121 16.3227 11.9751 16.3067 12.0491 16.2957L11.8681 16.3477L13.1551 20.8377C13.1871 21.0647 13.1591 21.4497 12.6751 21.5897C12.7021 21.6027 11.4291 21.9457 11.4291 21.9457L11.6761 24.0887L13.9041 23.4487C14.3191 23.3317 14.7291 23.2217 15.1301 23.1087L15.9471 25.9537L17.6571 25.4637L16.8501 22.6487C17.3087 22.527 17.7661 22.4004 18.2221 22.2687L19.0241 25.0717L20.7371 24.5807L19.9231 21.7407C22.7541 20.7497 24.5611 19.4467 24.0361 16.6707C23.6141 14.4367 22.3121 13.7587 20.5651 13.8347C21.4131 13.0447 21.7781 11.9767 21.2071 10.5347V10.5337ZM20.557 17.3037C21.167 19.4307 17.4571 20.2327 16.2971 20.5667L15.2161 16.7967C16.3761 16.4637 19.9201 15.0867 20.5561 17.3047L20.557 17.3037ZM18.2351 12.2137C18.7891 14.1487 15.6881 14.7937 14.7211 15.0707L13.7411 11.6517C14.7071 11.3747 17.6561 10.1967 18.2351 12.2147V12.2137Z"
        fill="white"
      />
    </svg>
  );
}
