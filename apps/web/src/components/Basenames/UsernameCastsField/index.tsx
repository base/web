import Fieldset from 'apps/web/src/components/Fieldset';
import Hint, { HintVariants } from 'apps/web/src/components/Hint';
import Input from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';

import {
  UsernameTextRecordKeys,
  textRecordsKeysForDisplay,
  textRecordsKeysPlaceholderForDisplay,
} from 'apps/web/src/utils/usernames';
import { ChangeEvent, ReactNode, useCallback, useEffect, useId, useState } from 'react';

type UsernameCastInputProps = {
  value?: string;
  onChange: (value: string, index: number) => void;
  index: number;
  disabled: boolean;
};

const warpcastUrlRegex = /^https:\/\/warpcast\.com\/([a-zA-Z0-9._-]+)\/0x[0-9a-fA-F]+$/;

function UsernameCastInput({ value = '', onChange, index, disabled }: UsernameCastInputProps) {
  const onChangeCastUrl = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value, index);
    },
    [index, onChange],
  );

  const validCast = !value || value.match(warpcastUrlRegex);

  return (
    <Fieldset>
      <Input
        key={`cast_frame_${value}`}
        placeholder={textRecordsKeysPlaceholderForDisplay[UsernameTextRecordKeys.Casts]}
        onChange={onChangeCastUrl}
        disabled={disabled}
        className="rounded-md border border-gray-40/20 p-2 text-black"
        value={value}
        type="url"
      />
      {!validCast && <Hint variant={HintVariants.Error}>Must be a Warpcast URL</Hint>}
    </Fieldset>
  );
}

export type UsernameCastsFieldProps = {
  labelChildren?: ReactNode;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

const MAX_CASTS = 4;

export default function UsernameCastsField({
  labelChildren = textRecordsKeysForDisplay[UsernameTextRecordKeys.Casts],
  onChange,
  value,
  disabled = false,
}: UsernameCastsFieldProps) {
  const [casts, setCastsUrls] = useState<string[]>(value.split(',').filter((keyword) => !!keyword));

  useEffect(() => {
    onChange(UsernameTextRecordKeys.Casts, casts.join(','));
  }, [casts, onChange]);

  useEffect(() => {
    setCastsUrls(value.split(',').filter((keyword) => !!keyword));
  }, [value]);

  const UsernameCastsFieldId = useId();

  const onChangeCast = useCallback(
    (inputValue: string, index: number) => {
      const newCasts = [...casts];
      newCasts[index] = inputValue;
      setCastsUrls(newCasts);
    },
    [casts],
  );

  return (
    <Fieldset className="w-full">
      {labelChildren && <Label htmlFor={UsernameCastsFieldId}>{labelChildren}</Label>}
      {Array.from(Array(MAX_CASTS).keys()).map((index) => (
        <UsernameCastInput
          key={`cast_frame_${index}`}
          onChange={onChangeCast}
          disabled={disabled}
          index={index}
          value={casts[index]}
        />
      ))}
    </Fieldset>
  );
}
