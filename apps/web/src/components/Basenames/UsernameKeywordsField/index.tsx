import Fieldset from 'apps/web/src/components/Fieldset';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Label from 'apps/web/src/components/Label';

import {
  UsernameTextRecordKeys,
  textRecordsCommunicationKeywords,
  textRecordsCreativesKeywords,
  textRecordsEngineersKeywords,
  textRecordsKeysForDisplay,
  textRecordsKeywords,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ReactNode, useCallback, useEffect, useId, useState } from 'react';

export type UsernameKeywordsFieldProps = {
  labelChildren?: ReactNode;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

export default function UsernameKeywordsField({
  labelChildren = textRecordsKeysForDisplay[UsernameTextRecordKeys.Keywords],
  onChange,
  value,
  disabled = false,
}: UsernameKeywordsFieldProps) {
  const [keywords, setKeywords] = useState<string[]>(
    value.split(',').filter((keyword) => !!keyword),
  );

  const onClickKeyword = useCallback(
    (keyword: string) => {
      if (keywords.includes(keyword)) {
        setKeywords((previousKeywords) => previousKeywords.filter((k) => k !== keyword));
      } else {
        setKeywords([...keywords, keyword]);
      }
    },
    [keywords],
  );

  useEffect(() => {
    onChange(UsernameTextRecordKeys.Keywords, keywords.join(','));
  }, [keywords, onChange]);

  useEffect(() => {
    setKeywords(value.split(',').filter((keyword) => !!keyword));
  }, [value]);

  const usernameKeywordsFieldId = useId();

  const renderKeyword = useCallback(
    (keyword: string) => {
      const keywordSelected = keywords.includes(keyword);
      const keywordClasses = classNames(
        'flex items-center gap-2 rounded-xl border  px-3 py-2 text-sm font-bold transition-all',
        {
          'bg-white hover:bg-gray-40/5 border-gray-40/20 text-black': !keywordSelected,
          'border-[#7FD057] bg-[#7FD057]/20 text-[#195D29]':
            keywordSelected && textRecordsEngineersKeywords.includes(keyword),
          'border-[#F8BDF5] bg-[#F8BDF5]/20 text-[#741A66]':
            keywordSelected && textRecordsCreativesKeywords.includes(keyword),
          'border-[#45E1E5] bg-[#45E1E5]/20 text-[#004774]':
            keywordSelected && textRecordsCommunicationKeywords.includes(keyword),
        },
      );

      return (
        <li key={keyword}>
          <button
            type="button"
            className={keywordClasses}
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onClick={() => onClickKeyword(keyword)}
            disabled={disabled}
          >
            {keyword}

            <Icon
              name={keywords.includes(keyword) ? 'cross' : 'plus'}
              color="currentColor"
              width="0.75rem"
              height="0.75rem"
            />
          </button>
        </li>
      );
    },
    [disabled, keywords, onClickKeyword],
  );

  return (
    <Fieldset>
      {labelChildren && <Label htmlFor={usernameKeywordsFieldId}>{labelChildren}</Label>}

      <ul className="flex flex-wrap gap-2">{textRecordsKeywords.map(renderKeyword)}</ul>
    </Fieldset>
  );
}
