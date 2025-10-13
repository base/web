import Fieldset from 'apps/web/src/components/Fieldset';
import Hint from 'apps/web/src/components/Hint';
import Label from 'apps/web/src/components/Label';
import TextArea from 'apps/web/src/components/TextArea';
import {
  textRecordsKeysPlaceholderForDisplay,
  USERNAME_DESCRIPTION_MAX_LENGTH,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import { ChangeEvent, ReactNode, useCallback, useId } from 'react';

export type UsernameDescriptionFieldProps = {
  labelChildren?: ReactNode;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

export default function UsernameDescriptionField({
  labelChildren = 'Description',
  onChange,
  value,
  disabled = false,
}: UsernameDescriptionFieldProps) {
  const descriptionLength = value.length;

  const onChangeDescription = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const description = event.target.value;
      if (description.length > USERNAME_DESCRIPTION_MAX_LENGTH) {
        event.preventDefault();
      } else {
        // setDescription(value);
        if (onChange) onChange(UsernameTextRecordKeys.Description, description);
      }
    },
    [onChange],
  );

  const usernameDescriptionFieldId = useId();
  const descriptionCharactersRemaining = USERNAME_DESCRIPTION_MAX_LENGTH - descriptionLength;

  return (
    <Fieldset>
      {labelChildren && <Label htmlFor={usernameDescriptionFieldId}>{labelChildren}</Label>}
      <TextArea
        id={usernameDescriptionFieldId}
        placeholder={textRecordsKeysPlaceholderForDisplay[UsernameTextRecordKeys.Description]}
        maxLength={USERNAME_DESCRIPTION_MAX_LENGTH}
        onChange={onChangeDescription}
        disabled={disabled}
        value={value}
      />
      <Hint>
        {String(descriptionCharactersRemaining)}{' '}
        {descriptionCharactersRemaining === 1 ? 'character' : 'characters'} remaining
      </Hint>
    </Fieldset>
  );
}
