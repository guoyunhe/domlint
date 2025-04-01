import { FastColor } from '@ant-design/fast-color';
import unique from '@guoyunhe/unique-selector';
import { DOMLintConfig } from './DOMLintConfig';
import { DOMLintAttributeReport, DOMLintElementReport, DOMLintReport } from './DOMLintReport';
import { printReport } from './printReport';
import { validateStyle } from './validateStyle';

export class DOMLint {
  report: DOMLintReport | undefined = undefined;

  constructor(public config: DOMLintConfig) {}

  lint(root?: Element): DOMLintReport {
    const report: DOMLintReport = { score: 0, level: 'bad', goodness: 0, badness: 0, elements: {} };

    this.config.rules &&
      Object.entries(this.config.rules).forEach(([selector, elemRule]) => {
        if (elemRule.exist && !document.querySelector(selector)) {
          report.elements[selector] = {
            selector,
            pass: false,
            attributes: {
              exist: {
                pass: false,
                goodness: elemRule.exist.goodness ?? 1,
                badness: elemRule.exist.badness ?? 1,
                value: 'missing',
                expected: elemRule.exist.expected ?? 'existing',
              },
            },
          };
        }
      });

    (root || document).querySelectorAll('*').forEach((elem) => {
      const ignored = this.config.ignore?.some((selector) => elem.matches(selector));
      if (ignored) return;

      this.config.rules &&
        Object.entries(this.config.rules).forEach(([selector, elemRule]) => {
          const matched = elem.matches(selector);
          if (!matched) return;

          const uniqueSelector = unique(elem);

          if (!uniqueSelector) return;

          const elemReport: DOMLintElementReport = report.elements[uniqueSelector] || {
            selector: uniqueSelector,
            html: elem.outerHTML.substring(0, 100),
            pass: true,
            attributes: {},
          };

          if (elemRule.deprecated) {
            elemReport.attributes.deprecated = {
              pass: false,
              goodness: elemRule.deprecated.goodness ?? 1,
              badness: elemRule.deprecated.badness ?? 1,
              value: 'found',
              expected: elemRule.deprecated.expected ?? 'removed',
            };
            elemReport.pass = false;
          }

          elemRule.style &&
            elem instanceof HTMLElement &&
            elem.checkVisibility({
              contentVisibilityAuto: true,
              opacityProperty: true,
              visibilityProperty: true,
            }) &&
            Object.entries(elemRule.style).forEach(([name, rule]) => {
              const reportKey = `style.${name}`;
              const attrReport: DOMLintAttributeReport = elemReport.attributes[reportKey] ?? {
                pass: true,
                goodness: rule.goodness ?? 1,
                badness: rule.badness ?? 1,
                value: elem.computedStyleMap().get(name)?.toString() ?? 'none',
                expected: rule.expected,
              };

              if (!attrReport.pass) return;

              if (name === 'color' || name.endsWith('-color')) {
                const colorObj = new FastColor(attrReport.value);
                attrReport.value =
                  colorObj.a === 1 ? colorObj.toHexString() : colorObj.toRgbString();
              }

              const pass = !!rule.expected && validateStyle(elem, name, rule.expected);

              if (typeof pass === 'boolean') {
                attrReport.pass = pass;
                elemReport.attributes[reportKey] = attrReport;
                elemReport.pass &&= attrReport.pass;
              }
            });

          if (Object.keys(elemReport.attributes).length > 0) {
            report.elements[uniqueSelector] = elemReport;
          }
        });
    });

    Object.values(report.elements).forEach((elemReport) => {
      Object.values(elemReport.attributes).forEach((attrReport) => {
        if (attrReport.pass) {
          report.goodness += attrReport.goodness;
        } else {
          report.badness += attrReport.badness;
        }
      });
    });

    report.score = Math.floor((report.goodness / (report.goodness + report.badness)) * 100);

    if (Number.isNaN(report.score)) {
      report.score = 0;
    }

    if (report.score >= (this.config.threshold?.good ?? 90)) {
      report.level = 'good';
    } else if (report.score >= (this.config.threshold?.okay ?? 75)) {
      report.level = 'okay';
    } else {
      report.level = 'bad';
    }

    this.report = report;

    return report;
  }

  print(report?: DOMLintReport) {
    printReport(report || this.report);
  }
}
