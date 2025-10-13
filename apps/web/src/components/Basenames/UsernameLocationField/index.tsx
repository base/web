import Fieldset from 'apps/web/src/components/Fieldset';
import Input from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';
import {
  textRecordsKeysPlaceholderForDisplay,
  USERNAME_LOCATION_MAX_LENGTH,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import { ChangeEvent, ReactNode, useCallback, useId } from 'react';

export type UsernameLocationFieldProps = {
  labelChildren?: ReactNode;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

export default function UsernameLocationField({
  labelChildren = 'Location',
  onChange,
  value,
  disabled = false,
}: UsernameLocationFieldProps) {
  const onChangeLocation = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const location = event.target.value;
      if (location.length > USERNAME_LOCATION_MAX_LENGTH) {
        event.preventDefault();
      } else {
        if (onChange) onChange(UsernameTextRecordKeys.Location, location);
      }
    },
    [onChange],
  );

  const usernameLocationFieldId = useId();

  return (
    <Fieldset>
      {labelChildren && <Label htmlFor={usernameLocationFieldId}>{labelChildren}</Label>}
      <Input
        id={usernameLocationFieldId}
        placeholder={textRecordsKeysPlaceholderForDisplay[UsernameTextRecordKeys.Location]}
        maxLength={USERNAME_LOCATION_MAX_LENGTH}
        onChange={onChangeLocation}
        disabled={disabled}
        value={value}
        className="flex-1 rounded-md border border-gray-40/20 p-2 text-black"
      />
    </Fieldset>
  );
}
