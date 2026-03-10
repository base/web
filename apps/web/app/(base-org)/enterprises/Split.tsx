import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type ElementType,
} from 'react';

type SplitProps = {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  boxClassName?: string;
};

type SlotProps = { children: ReactNode };

function isSlot(node: ReactNode, slotComponent: ElementType): node is ReactElement {
  if (!isValidElement(node)) {
    return false;
  }

  // Check function reference directly
  if (node.type === slotComponent) {
    return true;
  }

  // Fallback: check displayName for development/debugging
  if (typeof node.type === 'function' && (node.type as any).displayName) {
    return (node.type as any).displayName === (slotComponent as any).displayName;
  }

  // Fallback: check function name
  if (typeof node.type === 'function' && typeof slotComponent === 'function') {
    return node.type.name === slotComponent.name;
  }

  return false;
}

export function Split({
  children,
  reverse = false,
  className = '',
  boxClassName = '',
}: SplitProps) {
  const items = Children.toArray(children);

  const text = items.find((c) => isSlot(c, Split.Text)) ?? null;
  const content = items.find((c) => isSlot(c, Split.Content)) ?? null;

  return (
    <section
      className={['grid w-full items-start gap-10 py-12 md:grid-cols-2', className].join(' ')}
    >
      <div className={reverse ? 'h-full md:order-2' : 'h-full'}>{text}</div>

      <div className={reverse ? 'md:order-1' : ''}>
        <div
          className={[
            '0-max-w-md aspect-[4/3] w-full',
            'overflow-hidden rounded-md bg-gray-5',
            'flex items-center justify-center',
            boxClassName,
          ].join(' ')}
        >
          {content}
        </div>
      </div>
    </section>
  );
}

const SplitText = function SplitText({ children }: SlotProps) {
  return <>{children}</>;
};
SplitText.displayName = 'Split.Text';
Split.Text = SplitText;

const SplitContent = function SplitContent({ children }: SlotProps) {
  return <>{children}</>;
};
SplitContent.displayName = 'Split.Content';
Split.Content = SplitContent;
