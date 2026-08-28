import { useState } from 'react';
import { Window } from '../components/window/Window';
import { Button } from '../components/controls/Button';
import { IconButton } from '../components/controls/IconButton';
import { Checkbox } from '../components/controls/Checkbox';
import { Radio, RadioGroup } from '../components/controls/Radio';
import { TextInput } from '../components/controls/TextInput';
import { ProgressBar } from '../components/controls/ProgressBar';
import { Scrollbar } from '../components/controls/Scrollbar';
import { Dropdown } from '../components/navigation/Dropdown';
import { Tabs } from '../components/navigation/Tabs';
import { Tooltip } from '../components/navigation/Tooltip';
import { StatusBar, StatusBarField } from '../components/navigation/StatusBar';
import { SystemPanel } from '../compositions/SystemPanel';

/**
 * Control gallery — every control, in every documented variant.
 *
 * Copy here is intentionally generic. Components in this system never ship
 * with product or campaign wording.
 */
export function ControlGallery() {
  const [checked, setChecked] = useState(true);
  const [choice, setChoice] = useState('one');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>('alpha');
  const [tab, setTab] = useState('general');

  return (
    <Window
      title="Controls"
      scale="md"
      statusBar={
        <StatusBar>
          <StatusBarField grow>Ready</StatusBarField>
          <StatusBarField width={90}>18 objects</StatusBarField>
        </StatusBar>
      }
    >
      <SystemPanel label="Buttons" layout="row" gap={8}>
        <Button>Default</Button>
        <Button variant="default-action">Default action</Button>
        <Button variant="flat">Flat</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
        <Button scale="lg">Large</Button>
        <IconButton label="Open">▣</IconButton>
        <IconButton label="Cut" variant="flat">
          ✂
        </IconButton>
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Selection" layout="row" gap={24}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Checkbox label="Checked" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <Checkbox label="Unchecked" defaultChecked={false} />
          <Checkbox label="Mixed" indeterminate readOnly checked={false} />
          <Checkbox label="Disabled" disabled />
        </div>
        <RadioGroup label="Mode">
          {['one', 'two', 'three'].map((value) => (
            <Radio
              key={value}
              name="gallery-mode"
              label={`Option ${value}`}
              checked={choice === value}
              onChange={() => setChoice(value)}
            />
          ))}
        </RadioGroup>
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Input" layout="row" gap={16} align="end">
        <TextInput label="Field" defaultValue="Text value" />
        <TextInput label="Terminal" variant="terminal" defaultValue="input" caret />
        <Dropdown
          label="List"
          options={[
            { id: 'alpha', label: 'Alpha' },
            { id: 'beta', label: 'Beta' },
            { id: 'gamma', label: 'Gamma' },
          ]}
          value={selected}
          open={open}
          onToggle={setOpen}
          onSelect={(id) => {
            setSelected(id);
            setOpen(false);
          }}
          width={160}
        />
        <Tooltip content="System hint" open placement="bottom">
          <Button>Anchored</Button>
        </Tooltip>
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Feedback" layout="stack" gap={12}>
        <ProgressBar value={0.6} label="Segmented" />
        <ProgressBar value={0.4} variant="solid" label="Solid" />
        <ProgressBar indeterminate label="Indeterminate" />
      </SystemPanel>

      <div style={{ height: 24 }} />

      <SystemPanel label="Structure" layout="row" gap={16} align="start">
        <Tabs
          tabs={[
            { id: 'general', label: 'General' },
            { id: 'detail', label: 'Detail' },
            { id: 'locked', label: 'Locked', disabled: true },
          ]}
          value={tab}
          onChange={setTab}
        >
          <p style={{ fontSize: 12 }}>Panel content for “{tab}”.</p>
        </Tabs>
        <div style={{ height: 120 }}>
          <Scrollbar position={0.35} thumbSize={0.25} label="Vertical" />
        </div>
        <div style={{ width: 200 }}>
          <Scrollbar orientation="horizontal" position={0.5} thumbSize={0.4} label="Horizontal" />
        </div>
      </SystemPanel>
    </Window>
  );
}
