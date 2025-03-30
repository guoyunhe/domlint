import { useMemo, useState } from 'react';
import { DOMLint } from './DOMLint';
import { DOMLintConfig } from './DOMLintConfig';
import { DOMLintReport } from './DOMLintReport';
import './DOMLintUI.css';

export interface DOMLintUIProps {
  config: DOMLintConfig;
}

export function DOMLintUI({ config }: DOMLintUIProps) {
  const domlint = useMemo(() => new DOMLint(config), [config]);
  const [report, setReport] = useState<DOMLintReport | null>(null);

  return (
    <div className="domlint-ui">
      <div className="domlint-ui-toolbar">
        <button
          className="domlint-ui-button"
          onClick={() => {
            setReport(domlint.lint());
          }}
        >
          🚀 Run DOMLint
        </button>

        <button
          className="domlint-ui-button"
          onClick={() => {
            setReport(domlint.lint());
          }}
        >
          📝 View Result
        </button>

        <span>{report?.score}</span>
      </div>

      <div>{}</div>
    </div>
  );
}
