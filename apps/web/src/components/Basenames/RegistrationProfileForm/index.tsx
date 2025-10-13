import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import {
  registrationTransitionDuration,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import UsernameDescriptionField from 'apps/web/src/components/Basenames/UsernameDescriptionField';
import UsernameKeywordsField from 'apps/web/src/components/Basenames/UsernameKeywordsField';
import UsernameTextRecordInlineField from 'apps/web/src/components/Basenames/UsernameTextRecordInlineField';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Label from 'apps/web/src/components/Label';
import TransactionError from 'apps/web/src/components/TransactionError';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import {
  UsernameTextRecordKeys,
  textRecordsSocialFieldsEnabled,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useState } from 'react';

export enum FormSteps {
  Description = 'description',
  Socials = 'socials',
  Keywords = 'keywords',
}

export default function RegistrationProfileForm() {
  const [currentFormStep, setCurrentFormStep] = useState<FormSteps>(FormSteps.Description);
  const [transitionStep, setTransitionStep] = useState<boolean>(false);
  const { logError } = useErrors();
  const { redirectToProfile, selectedNameFormatted } = useRegistration();
  const { logEventWithContext } = useAnalytics();

  const {
    updateTextRecords,
    updatedTextRecords,
    writeTextRecords,
    writeTextRecordsIsPending,
    writeTextRecordsError,
  } = useWriteBaseEnsTextRecords({
    username: selectedNameFormatted,
    onSuccess: () => {
      redirectToProfile();
    },
  });

  const transitionFormOpacity = useCallback((callbackFunction: () => void) => {
    // Hide the form
    setTransitionStep(true);

    setTimeout(() => {
      // Display the next step
      callbackFunction();
      setTimeout(() => {
        // Show the form
        setTransitionStep(false);
      }, 700);
    }, 700);
  }, []);

  const onClickSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (currentFormStep === FormSteps.Description) {
        transitionFormOpacity(() => setCurrentFormStep(FormSteps.Socials));
      }

      if (currentFormStep === FormSteps.Socials) {
        transitionFormOpacity(() => setCurrentFormStep(FormSteps.Keywords));
      }

      if (currentFormStep === FormSteps.Keywords) {
        writeTextRecords()
          .then()
          .catch((error) => {
            logError(error, 'Failed to write text records');
          });
      }

      event.preventDefault();
    },
    [currentFormStep, logError, transitionFormOpacity, writeTextRecords],
  );

  const onChangeTextRecord = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      updateTextRecords(key, value);
    },
    [updateTextRecords],
  );

  const formClasses = classNames(
    'flex flex-col justify-between gap-4 text-gray-60 md:items-center rounded-3xl shadow-xl p-8 transition-all',
    registrationTransitionDuration,
    { 'opacity-0': transitionStep, 'opacity-100': !transitionStep },
  );

  const descriptionLabelChildren = (
    <div className="flex w-full cursor-pointer flex-col">
      <div className="flex flex-row justify-between text-black">
        <div className="flex flex-row items-center gap-1 text-blue-500">
          <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
          <strong className="text-black">Add Bio</strong>
        </div>
        <span className="font-normal">Step 1 of 3</span>
      </div>
    </div>
  );

  const socialsLabelChildren = (
    <div className="flex w-full cursor-pointer flex-col">
      <div className="flex flex-row justify-between text-black">
        <div className="flex flex-row items-center gap-1 text-blue-500">
          <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
          <strong className="text-black">Add Socials</strong>
        </div>
        <span className="font-normal">Step 2 of 3</span>
      </div>
    </div>
  );

  const keywordsLabelChildren = (
    <div className="mb-2 flex w-full cursor-pointer flex-col">
      <div className="flex flex-row justify-between text-black">
        <div className="flex flex-row items-center gap-1 text-blue-500">
          <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
          <strong className="text-black">Add areas of expertise</strong>
        </div>
        <span className="font-normal">Step 3 of 3</span>
      </div>
    </div>
  );

  useEffect(() => {
    logEventWithContext(`registration_profile_form_step_${currentFormStep}`, ActionType.change);
  }, [currentFormStep, logEventWithContext]);

  return (
    <form className={formClasses}>
      {currentFormStep === FormSteps.Description && (
        <UsernameDescriptionField
          labelChildren={descriptionLabelChildren}
          onChange={onChangeTextRecord}
          value={updatedTextRecords[UsernameTextRecordKeys.Description]}
          disabled={writeTextRecordsIsPending}
        />
      )}
      {currentFormStep === FormSteps.Socials && (
        <Fieldset>
          <Label>{socialsLabelChildren}</Label>
          {textRecordsSocialFieldsEnabled.map((textRecordKey) => (
            <UsernameTextRecordInlineField
              key={textRecordKey}
              textRecordKey={textRecordKey}
              onChange={onChangeTextRecord}
              value={updatedTextRecords[textRecordKey]}
              disabled={writeTextRecordsIsPending}
            />
          ))}
        </Fieldset>
      )}
      {currentFormStep === FormSteps.Keywords && (
        <div className="mb-2">
          <UsernameKeywordsField
            labelChildren={keywordsLabelChildren}
            onChange={onChangeTextRecord}
            value={updatedTextRecords[UsernameTextRecordKeys.Keywords]}
            disabled={writeTextRecordsIsPending}
          />
        </div>
      )}
      <Button
        variant={ButtonVariants.Black}
        rounded
        fullWidth
        disabled={writeTextRecordsIsPending}
        isLoading={writeTextRecordsIsPending}
        onClick={onClickSave}
      >
        {currentFormStep === FormSteps.Keywords ? "I'm done" : 'Next'}
      </Button>
      {writeTextRecordsError && <TransactionError error={writeTextRecordsError} />}
    </form>
  );
}
