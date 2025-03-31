import cn from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DOMLint } from './DOMLint';
import { DOMLintConfig } from './DOMLintConfig';
import { DOMLintReport } from './DOMLintReport';
import './DOMLintUI.css';

export interface DOMLintUIProps {
  config: DOMLintConfig;
}

export function DOMLintUI({ config }: DOMLintUIProps) {
  const domlint = useMemo(
    () =>
      new DOMLint({
        ...config,
        ignore: [...(config.ignore || []), '.domlint-ui', '.domlint-ui *', '.domlint-ui-highlight'],
      }),
    [config],
  );
  const [report, setReport] = useState<DOMLintReport | null>(null);

  const [width] = useState(600);
  const [left, setLeft] = useState(window.innerWidth / 2 - width / 2);
  const [top, setTop] = useState(10);

  const [highlightElement, setHighlightElement] = useState<Element | null>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (highlightElement && highlightRef.current) {
        const rect = highlightElement.getBoundingClientRect();
        highlightRef.current.style.left = `${rect.left}px`;
        highlightRef.current.style.top = `${rect.top}px`;
        highlightRef.current.style.width = `${rect.width}px`;
        highlightRef.current.style.height = `${rect.height}px`;
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [highlightElement]);

  return (
    <>
      <div className="domlint-ui" style={{ left, top, width }}>
        <div
          className="domlint-ui-toolbar"
          onMouseMove={(e) => {
            if (e.buttons === 1) {
              setLeft((prev) =>
                Math.min(window.innerWidth - 500, Math.max(10, prev + e.movementX)),
              );
              setTop((prev) => Math.min(window.innerHeight - 50, Math.max(10, prev + e.movementY)));
            }
          }}
        >
          <button
            className="domlint-ui-button"
            onClick={() => {
              setReport(domlint.lint());
            }}
          >
            🚀 Run
          </button>

          <span className="domlint-ui-score">
            <span>Score:</span>
            <span className={`domlint-ui-score-value domlint-ui-score-value-${report?.level}`}>
              {report?.score || 0}
            </span>
            <span>Goodness:</span>
            <span className={`domlint-ui-score-value domlint-ui-score-value-good`}>
              {report?.goodness || 0}
            </span>
            <span>Badness:</span>
            <span className={`domlint-ui-score-value domlint-ui-score-value-bad`}>
              {report?.goodness || 0}
            </span>
          </span>
        </div>

        {report?.elements && (
          <div className="domlint-ui-report">
            {Object.entries(report?.elements).map(([selector, elemReport]) => (
              <div key={selector} className="domlint-ui-element">
                <a
                  href="#"
                  className="domlint-ui-selector"
                  onClick={(e) => {
                    e.preventDefault();
                    const elem = document.querySelector(selector);
                    elem?.scrollIntoView({
                      block: 'center',
                      inline: 'center',
                      behavior: 'smooth',
                    });
                    setHighlightElement(elem);
                  }}
                >
                  {selector}
                </a>

                <div className="domlint-ui-attribute-list">
                  {Object.entries(elemReport.attributes).map(([name, attrReport]) => (
                    <div key={name} className="domlint-ui-attribute">
                      <span className="domlint-ui-attribute-name">{name}</span>
                      <span>: </span>
                      <span
                        className={cn(
                          'domlint-ui-attribute-value',
                          !attrReport.pass && 'domlint-ui-attribute-value-bad',
                        )}
                      >
                        {renderValue(attrReport.value)}
                      </span>
                      <span>&nbsp;</span>
                      {!attrReport.pass && (
                        <span className="domlint-ui-attribute-expected">
                          [expected:{' '}
                          {Array.isArray(attrReport.expected)
                            ? attrReport.expected.map(renderValue)
                            : renderValue(attrReport.expected || 'none')}
                          ]
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div ref={highlightRef} className="domlint-ui-highlight" />
    </>
  );
}

function renderValue(value: string, index?: number) {
  if (value.startsWith('#') || value.startsWith('rgba(')) {
    return (
      <span key={index} className="domlint-ui-value">
        <span className="domlint-ui-color-box" style={{ background: value }} /> {value}
      </span>
    );
  } else {
    return (
      <span key={index} className="domlint-ui-value">
        {value}
      </span>
    );
  }
}
