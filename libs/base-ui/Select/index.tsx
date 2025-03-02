import { forwardRef } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import classnames from 'classnames';

const SelectItem = React.memo(forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item className={classnames('SelectItem', className)} {...props} ref={ref}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
));

const FruitOptions = () => (
  <SelectPrimitive.Group>
    <SelectPrimitive.Label className="SelectLabel">Fruits</SelectPrimitive.Label>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="blueberry">Blueberry</SelectItem>
    <SelectItem value="grapes">Grapes</SelectItem>
    <SelectItem value="pineapple">Pineapple</SelectItem>
  </SelectPrimitive.Group>
);

function Select() {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger className="SelectTrigger" aria-label="Food">
        <SelectPrimitive.Value placeholder="Select a fruit…" />
        <SelectPrimitive.Icon className="SelectIcon">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="SelectContent">
          <SelectPrimitive.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="SelectViewport">
            <FruitOptions />
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export { Select };
