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

  const [left, setLeft] = useState(10);
  const [top, setTop] = useState(10);

  return (
    <div
      className="domlint-ui"
      style={{ left, top }}
      onMouseMove={(e) => {
        console.log(e.button);
        if (e.button) {
          setLeft((prev) => prev + e.movementX);
          setTop((prev) => prev + e.movementY);
        }
      }}
    >
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

        <span className="domlint-ui-score">
          Score:{' '}
          <span className={`domlint-ui-score-value domlint-ui-score-value-${report?.level}`}>
            {report?.score || 0}
          </span>
        </span>
      </div>

      <div>{}</div>
    </div>
  );
}
