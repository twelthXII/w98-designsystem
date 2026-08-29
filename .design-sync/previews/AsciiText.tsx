import { AsciiText } from 'w98-ascii-design-system';

/** The four variants — readable text wearing the text-mode voice. */
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
    <AsciiText variant="plain">plain monospaced run</AsciiText>
    <AsciiText variant="label">system label</AsciiText>
    <AsciiText variant="path" prefix="C:\">system\config</AsciiText>
    <AsciiText variant="terminal">light ink on a dark ground</AsciiText>
  </div>
);

/** The caret implies a live session in a still frame. */
export const WithCaret = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
    <AsciiText variant="terminal" caret>awaiting input</AsciiText>
    <AsciiText variant="plain" prefix=">" caret>type here</AsciiText>
  </div>
);

/** Role sets optical weight: ambient and decorative stay quiet. */
export const Roles = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
    <AsciiText role="semantic">semantic — depicts the subject</AsciiText>
    <AsciiText role="illustrative">illustrative — helps explain</AsciiText>
    <AsciiText role="decorative">decorative — character only</AsciiText>
    <AsciiText role="ambient">ambient — passive texture</AsciiText>
  </div>
);
