import React, { FunctionComponent } from 'react';
import { SelectableStrings } from '../types';
import { SelectableValue } from '@grafana/data';
import { Segment } from '@grafana/ui';

export interface Props {
  values: string[];
  onChange: (values: string[]) => void;
  variableOptionGroup: SelectableValue<string>;
}

const options: SelectableStrings = ['Average', 'Maximum', 'Minimum', 'Sum', 'SampleCount'].map(value => ({
  label: value,
  value: value,
}));

const removeText = '-- remove stat --';
const removeOption: SelectableValue<string> = { label: removeText, value: removeText };

export const Stats: FunctionComponent<Props> = ({ values, onChange, variableOptionGroup }) => (
  <>
    {values &&
      values.map((value, index) => (
        <Segment
          key={value + index}
          value={value}
          options={[removeOption, ...options, variableOptionGroup]}
          onChange={value =>
            onChange(
              value === removeText
                ? values.filter((_, i) => i !== index)
                : values.map((v, i) => (i === index ? value : v))
            )
          }
        />
      ))}
    {values.length !== options.length && (
      <Segment
        Component={
          <a className="gf-form-label query-part">
            <i className="fa fa-plus" />
          </a>
        }
        allowCustomValue={true}
        onChange={(value: string) => onChange([...values, value])}
        options={options.filter(({ value }) => !values.includes(value))}
      />
    )}
  </>
);
