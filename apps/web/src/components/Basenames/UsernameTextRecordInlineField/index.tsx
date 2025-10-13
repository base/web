import Fieldset from 'apps/web/src/components/Fieldset';
import Hint, { HintVariants } from 'apps/web/src/components/Hint';
import Input from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';
import {
  textRecordsKeysForDisplay,
  textRecordsKeysPlaceholderForDisplay,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';

import { ChangeEvent, useCallback, useId, useState } from 'react';

export type UsernameTextRecordInlineFieldProps = {
  textRecordKey: UsernameTextRecordKeys;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

export function validateTextRecordValue(textRecordKey: UsernameTextRecordKeys, value: string) {
  if (textRecordKey === UsernameTextRecordKeys.Url) {
    return value.startsWith('https://');
  }
  if (
    [
      UsernameTextRecordKeys.Github,
      UsernameTextRecordKeys.Twitter,
      UsernameTextRecordKeys.Farcaster,
      UsernameTextRecordKeys.Lens,
      UsernameTextRecordKeys.Telegram,
      UsernameTextRecordKeys.Discord,
    ].includes(textRecordKey)
  ) {
    return !value.startsWith('@') && !value.startsWith('https://');
  }
}

export function textRecordHintForDisplay(textRecordKey: UsernameTextRecordKeys) {
  if (
    [UsernameTextRecordKeys.Url, UsernameTextRecordKeys.Url2, UsernameTextRecordKeys.Url3].includes(
      textRecordKey,
    )
  ) {
    return 'Must be a valid https url';
  }
  if (
    [
      UsernameTextRecordKeys.Github,
      UsernameTextRecordKeys.Twitter,
      UsernameTextRecordKeys.Farcaster,
      UsernameTextRecordKeys.Lens,
      UsernameTextRecordKeys.Telegram,
      UsernameTextRecordKeys.Discord,
    ].includes(textRecordKey)
  ) {
    return 'Input username only';
  }

  return '';
}

export default function UsernameTextRecordInlineField({
  textRecordKey,
  onChange,
  value,
  disabled = false,
}: UsernameTextRecordInlineFieldProps) {
  const usernameSocialHandleFieldId = useId();
  const [validationError, setValidationHint] = useState<string>('');
  const onTextRecordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const textRecordValue = event.target.value;

      if (!validateTextRecordValue(textRecordKey, textRecordValue)) {
        setValidationHint(textRecordHintForDisplay(textRecordKey));
      } else {
        setValidationHint('');
      }

      if (onChange) onChange(textRecordKey, textRecordValue);
    },
    [onChange, textRecordKey],
  );

  const inputType = [
    UsernameTextRecordKeys.Url,
    UsernameTextRecordKeys.Url2,
    UsernameTextRecordKeys.Url3,
  ].includes(textRecordKey)
    ? 'url'
    : 'text';
  return (
    <Fieldset inline>
      <Label htmlFor={usernameSocialHandleFieldId} className="w-full max-w-[6rem] text-sm">
        {textRecordsKeysForDisplay[textRecordKey]}
      </Label>
      <div className="flex w-full flex-col gap-2">
        <Input
          id={usernameSocialHandleFieldId}
          placeholder={textRecordsKeysPlaceholderForDisplay[textRecordKey]}
          className="flex-1 rounded-md border border-gray-40/20 p-2 text-black"
          disabled={disabled}
          value={value}
          autoComplete="off"
          autoCapitalize="none"
          type={inputType}
          onChange={onTextRecordChange}
          data-1p-ignore
        />
        {validationError && <Hint variant={HintVariants.Error}>{validationError}</Hint>}
      </div>
    </Fieldset>
  );
}
