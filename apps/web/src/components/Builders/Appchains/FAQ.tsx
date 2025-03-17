'use client';

import { useState, useCallback } from 'react';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I know if Appchains are right for me?',
    answer: 'Appchains are for mature projects who are seeking scale through dedicated blockspace, full control over their infrastructure, or may be looking to utilize custom gas tokens.'
  },
  {
    question: 'How do I create an Appchain?',
    answer: 'We are selecting early access customers off our waitlist. Once approved, you\'ll get access to both testnet and mainnet features for Base Appchains.'
  },
  {
    question: 'I am considering launching my own altL1 or L2 Rollup — should I be deploying a Base Appchain instead?',
    answer: 'Appchains are a great alternative to launching an altL1 or L2. As an extension of the Base ecosystem, Appchains benefit from the Ethereum alignment, co-marketing, liquidity and users of Base Mainnet.'
  },
  {
    question: 'What is the UX of users onboarding onto an Appchain?',
    answer: 'Appchains aims to provide a seamless onboarding between Base. Users will be able to move funds between Base and other Appchains in seconds and will have the ability to provide the same UX as Base applications.'
  },
  {
    question: 'Will I have to worry about managing critical private keys if I launch an Appchain?',
    answer: 'No. Coinbase hosts the core infrastructure of Appchains and secures associated private keys on your behalf.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = useCallback((index: number) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  }, []);

  const getItemClickHandler = useCallback((index: number) => {
    return () => handleClick(index);
  }, [handleClick]);

  const renderFAQItem = useCallback((item: FAQItem, i: number) => {
    if (!item?.question) return null;
    
    const questionId = `faq-question-${item.question.toLowerCase().replace(/\s+/g, '-')}`;
    return (
      <div
        key={questionId}
        className="rounded-lg overflow-hidden bg-dark-palette-backgroundAlternate"
      >
        <button
          type="button"
          className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-900 transition-colors group"
          onClick={getItemClickHandler(i)}
        >
          <div className="flex items-center gap-3">
            <div className={`transform transition-transform duration-200 ease-in-out origin-center ${
              openIndex === i ? 'rotate-90' : ''
            }`}>
              <Icon
                name="chevronRight"
                width={16}
                height={16}
                color="white"
              />
            </div>
            <span className="text-lg font-medium">{item.question}</span>
          </div>
        </button>
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
            openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="p-6 pt-0 text-gray-400">{item.answer}</p>
        </div>
      </div>
    );
  }, [getItemClickHandler, openIndex]);

  if (!Array.isArray(FAQ_ITEMS)) return null;

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col md:flex-row md:gap-24 gap-8">
        <div className="md:w-1/3 md:pt-6">
          <Title level={TitleLevel.Title1} className="font-bold">
            Frequently asked questions
          </Title>
          <div className="hidden md:flex justify-start mt-8">
            <ButtonWithLinkAndEventLogging
              href="https://docs.cdp.coinbase.com/appchains/docs/appchain-faq"
              target="_blank"
              variant={ButtonVariants.SecondaryOutline}
              buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
              eventName="appchains-see-all-faqs"
            >
              <div className="flex items-center gap-4">
                <span>All FAQs</span>
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="baseOrgDiagonalUpArrow" width={16} height={16} color="white" />
                </div>
              </div>
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
        
        <div className="md:w-2/3 flex flex-col gap-4">
          {FAQ_ITEMS.map(renderFAQItem)}
        </div>

        <div className="md:hidden flex justify-center mt-4">
          <ButtonWithLinkAndEventLogging
            href="https://docs.cdp.coinbase.com/appchains/docs/appchain-faq"
            target="_blank"
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
            eventName="appchains-see-all-faqs"
          >
            <div className="flex items-center gap-4">
              <span>All FAQs</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </div>
  );
} 