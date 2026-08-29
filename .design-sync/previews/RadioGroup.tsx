import { Radio, RadioGroup } from 'w98-ascii-design-system';

/* A group box spans its dialog in situ; constrain it so the card reads as one object. */
const W = <style>{`.rg-w { width: 220px; }`}</style>;

/** The etched group box from a properties dialog. */
export const Column = () => (
  <>{W}<RadioGroup label="View" className="rg-w">
    <Radio name="v" label="Large icons" defaultChecked />
    <Radio name="v" label="Small icons" />
    <Radio name="v" label="List" />
    <Radio name="v" label="Details" />
  </RadioGroup></>
);

/** Horizontal set, for a compact choice. */
export const Row = () => (
  <>{W}<RadioGroup label="Align" direction="row" className="rg-w">
    <Radio name="al" label="Left" defaultChecked />
    <Radio name="al" label="Center" />
    <Radio name="al" label="Right" />
  </RadioGroup></>
);

/** Isolated on empty ground, a single group box is a whole composition. */
export const Isolated = () => (
  <div style={{ padding: 32 }}>
    {W}
    <RadioGroup label="Mode" className="rg-w">
      <Radio name="m" label="Automatic" defaultChecked />
      <Radio name="m" label="Manual" />
    </RadioGroup>
  </div>
);
