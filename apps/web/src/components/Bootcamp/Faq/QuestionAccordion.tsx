'use client';
import { ReactNode, useCallback, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

type QuestionAccordionProps = {
  question: string;
  answer: ReactNode;
};

export function QuestionAccordion({ question, answer }: QuestionAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((o) => !o), [setIsOpen]);

  return (
    <div className="flex flex-col gap-6 border-b border-gray-90 pb-6 pt-5">
      <button
        type="button"
        className="flex flex-row justify-between py-2 text-base font-medium text-white"
        onClick={toggleOpen}
      >
        <span className="text-left">{question}</span>
        <span>
          {isOpen ? (
            <ChevronUpIcon className="ml-2 h-4 text-white" />
          ) : (
            <ChevronDownIcon className="ml-2 h-4 text-white" />
          )}
        </span>
      </button>
      {isOpen && <span className="text-base text-white">{answer}</span>}
    </div>
  );
}
