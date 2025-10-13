import {
  textRecordsCommunicationKeywords,
  textRecordsCreativesKeywords,
  textRecordsEngineersKeywords,
  textRecordsKeysForDisplay,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';

type UsernameProfileKeywordsProps = {
  keywords: string;
};

export default function UsernameProfileKeywords({ keywords }: UsernameProfileKeywordsProps) {
  const keywordsArray = keywords.split(',').filter((k) => !!k);

  const renderKeyword = (keyword: string) => {
    const keywordClasses = classNames(
      'flex items-center gap-2 rounded-xl border  px-3 py-2 text-sm font-bold transition-all',
      {
        'border-[#7FD057] bg-[#7FD057]/20 text-[#195D29]':
          textRecordsEngineersKeywords.includes(keyword),
        'border-[#F8BDF5] bg-[#F8BDF5]/20 text-[#741A66]':
          textRecordsCreativesKeywords.includes(keyword),
        'border-[#45E1E5] bg-[#45E1E5]/20 text-[#004774]':
          textRecordsCommunicationKeywords.includes(keyword),
      },
    );

    return (
      <li key={keyword}>
        <span className={keywordClasses}>{keyword}</span>
      </li>
    );
  };
  return (
    <div>
      <h2 className="font-bold uppercase text-[#5B616E]">
        {textRecordsKeysForDisplay[UsernameTextRecordKeys.Keywords]}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">{keywordsArray.map(renderKeyword)}</ul>
    </div>
  );
}
