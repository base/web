'use client';
import { Dispatch, SetStateAction, useCallback, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, cubicBezier, Variants } from 'motion/react';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);
const transition = { duration: 0.24, ease: easeFn };

const containerVariants: Variants = {
  initial: { width: 'auto' },
  animate: { width: 'auto' },
};

const inputVariants: Variants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: 'auto', opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const buttonVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
      <path
        d="M10.1991 10.3374C9.23628 11.0641 8.03761 11.4951 6.73828 11.4951C3.56264 11.4951 0.988281 8.92075 0.988281 5.74512C0.988281 2.56948 3.56264 -0.00488281 6.73828 -0.00488281C9.91392 -0.00488281 12.4883 2.56948 12.4883 5.74512C12.4883 7.04445 12.0573 8.24312 11.3305 9.20599L14.9883 12.8637L13.8569 13.9951L10.1991 10.3374ZM10.8883 5.74512C10.8883 3.45314 9.03026 1.59512 6.73828 1.59512C4.4463 1.59512 2.58828 3.45314 2.58828 5.74512C2.58828 8.0371 4.4463 9.89512 6.73828 9.89512C9.03026 9.89512 10.8883 8.0371 10.8883 5.74512Z"
        fill="#0A0B0D"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6.85346 7.99516L0.988281 2.12998L2.12315 0.995117L7.98832 6.86029L13.8535 0.995117L14.9884 2.12998L9.12319 7.99516L14.9883 13.8602L13.8534 14.9951L7.98832 9.13003L2.12324 14.9951L0.988368 13.8602L6.85346 7.99516Z"
        fill="#0A0B0D"
      />
    </svg>
  );
}

export function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const debounced = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(debounced.current);

      const value = e.target.value;
      setSearch(value);
    },
    [setSearch],
  );

  const onBlur = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const clearInput = useCallback(() => {
    setSearch('');
    setIsExpanded(false);
  }, [setSearch]);

  const handleSearchIconClick = useCallback(() => {
    setIsExpanded(true);
  }, []);

  useEffect(() => {
    if (isExpanded && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <motion.div
      className="relative flex h-8 max-w-[150px] flex-row items-center gap-2 rounded-[8px] border border-[#DEE1E7] p-2 md:max-w-none"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={transition}
    >
      <button
        type="button"
        onClick={handleSearchIconClick}
        className="flex-shrink-0 md:pointer-events-none"
        aria-label="Search"
      >
        <SearchIcon />
      </button>

      <input
        ref={inputRef}
        type="text"
        id="appsSearchBar"
        value={search}
        onChange={onChange}
        className="hidden max-w-[100px] flex-1 font-sans text-base text-black placeholder:text-base-gray-200 focus:outline-none md:block md:max-w-none"
        placeholder="Search"
        aria-label="Search for apps and integrations in the Base ecosystem"
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.input
            ref={mobileInputRef}
            type="text"
            value={search}
            onChange={onChange}
            onBlur={onBlur}
            className="max-w-[100px] flex-1 font-sans text-base text-black placeholder:text-base-gray-200 focus:outline-none md:hidden md:max-w-none"
            placeholder="Search"
            aria-label="Search for apps and integrations in the Base ecosystem"
            variants={inputVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {search && (
          <motion.button
            type="button"
            onClick={clearInput}
            aria-label="clear input"
            className="absolute right-2 flex-shrink-0"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
          >
            <XIcon />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
